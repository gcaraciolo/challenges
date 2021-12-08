# [Data modelling challenge] Membership with restrict resource access

Schema

```
resource
  id - int
  name - string
  account_id - foreign key

accounts
  id - int
  name - string

users
  id - int
  email - string

membership
  id - int
  user_id - foreign key
  account_id - foreign key
  total_access - bool

membership_available_resources
  id - int
  membership_id - foreign key
  resourcel_id - foreign key
```

Problem definition
When a membership has access to all resources, the `membership_available_resources` table should not have any reference.
All account resources should be associated to this member in the application.

Otherwise, when a membership has limited resource access, the `membership_available_resources` table should containt references
to the resources it has access.

Challenge:
There's a [test method](https://github.com/gcaraciolo/challenges/blob/master/tests/Feature/ExampleTest.php#L26) that is marked as incomplete. It shows that it´s not possible to make an eagger loading
with the current resource relationship defined in the membership model. My problem is make eager loading working.
