<?php

namespace Tests\Feature;

use App\Models\Account;
use App\Models\Membership;
use App\Models\Resource;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_associate_user_to_account()
    {
        $user = User::factory()->create();
        $account = Account::factory()->create(['name' => 'Stripe']);

        $account->users()->attach($user);

        $this->assertEquals(1, $account->users()->count());
    }

    public function test_total_access()
    {
        $user = User::factory()->create();
        $account = Account::factory()->create(['name' => 'Stripe']);
        $ec2 = Resource::factory()->make(['name' => 'ec2']);
        $account->resources()->save($ec2);

        $account->users()->attach($user, ['total_access' => true]);

        $this->assertEquals(1, $account->users()->count());
        $this->assertDatabaseCount('memberships', 1);
        $this->assertDatabaseHas('memberships', ['total_access' => true]);

        /**
         * Eager loading does not work, and a N+1 query is made
         *
         * Challenge: how to make eager loading working and make all this tests pass without N+1 problem
         *  */
        // $membership = Membership::with('resources')->first();
        $membership = Membership::first();
        $this->assertEquals('ec2', $membership->resources->first()->name);
        $this->assertDatabaseCount('membership_available_resources', 0);

        $this->markTestIncomplete('Eager loading does not work, and a N+1 query is made');
    }

    public function test_restrict_access__no_resource_attached()
    {
        $user = User::factory()->create();
        $account = Account::factory()->create(['name' => 'Stripe']);
        $ec2 = Resource::factory()->make(['name' => 'ec2']);
        $account->resources()->save($ec2);

        $account->users()->attach($user, ['total_access' => false]);

        $this->assertDatabaseHas('memberships', ['total_access' => false]);

        $membership = Membership::first();
        $this->assertNull($membership->resources->first());
    }

    public function test_restrict_access__single_resource_attached()
    {
        $user = User::factory()->create();
        $account = Account::factory()->create(['name' => 'Stripe']);
        $ec2 = Resource::factory()->make(['name' => 'ec2']);
        $account->resources()->save($ec2);
        $cloud9 = Resource::factory()->make(['name' => 'cloud9']);
        $account->resources()->save($cloud9);

        $account->users()->attach($user, ['total_access' => false]);

        $membership = Membership::first();
        $membership->resources()->attach($cloud9);
        $membership->refresh();

        $this->assertEquals(1, $membership->resources()->count());
        $this->assertDatabaseCount('membership_available_resources', 1);
    }
}
