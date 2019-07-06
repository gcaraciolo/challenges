# Armazenamento de produtos químicos
Um depósito armazena vários produtos químicos em pilhas formadas por grandes contêineres. Alguns produtos químicos são inertes e podem ser armazenados em praticamente qualquer lugar. Alguns são voláteis e devem ser armazenados em contêineres com ventilação especial. Alguns são explosivos e devem ser armazenados em contêineres com blindagem especial. Existem também regras sobre as combinações de produtos químicos permitidas dentro de um contêiner.

Os contêineres tem capacidade para armazenar até cinco produtos químicos, portanto você deve levar em consideração a ordem em que os produtos são armazenados, para não embalar todos os produtos sem restrições e ficar sem espaço para embalar os produtos químicos nocivos, que necessitam de contêineres especiais.

O objetivo é escrever um software que encontre uma forma eficiente e segura de colocar os produtos químicos dentro dos contêineres.

## Informações sobre os produtos químicos e contêineres

Para cada produto químico será especificado sua característica e qual tipo de contêiner ele poderá ser armazenado.

| Produto químico     | Característica | Especificação de armazenamento |
| ------------------- | -------------- | ------------------------------ |
| TNT                 | EXPLOSIVO      | BLINDADO                       |
| AREIA               | INERTE         | QUALQUER_UM                    |
| AMOSTRA_BIOLOGICA   | VOLATEL        | NAO_COM_EXPLOSIVO              |
| AMONIA              | VOLATEL        | VENTILADO                      |

Existem apenas três tipos de contêineres: **BLINDADO**, **VENTILADO** e **BASICO**. 

A regra de restrição de armazenamento com outros produtos é composta do sufixo **NAO_COM_** e a caraterística do produto a qual não pode ser armazenado em conjunto. Exemplo: **NAO_COM_VOLATEL**.

Produtos que tiverem a especificação **QUALQUER_UM** podem ser armazenados em quaisquer contêineres.

## Entra e saída de dados do programa

O caminho do arquivo contendo os dados de entrada será passado para o programa atráves da entrada padrão. O resultado deverá ser escrito na saída padrão.

A entrada e saída de dados são representados da seguinte maneira:

Entrada:

    PQ:Cp+E
    PQ:Cp+E
    PQ:Cp+E
    PQ:Cp+E
    PQ:Cp+E
    -----
    Cc
    Cc
    Cc

Onde:

**PQ:** Produto químico  
**Cp:** Característica do produto químico    
**E:** Especificação de armazenamento   
**Cc:** Característica dos contêineres disponíveis     
**(:) dois pontos:** Separação entre produtos químicos e suas características e especificações  
**----- (5 traços):** Separação entre produtos químicos e contêineres 

Saída:

    Cc:PQ,PQ
    Cc:PQ,PQ
    Cc:PQ

Onde:

**PQ:** Produto químico  
**Cc:** Característica dos contêineres disponíveis     
**(,) virgula:** Separação entre produtos químicos em um contêiner    
**(:) dois pontos:** Separação entre contêiner e os produtos químicos que armazena  

Na entrada, cada linha representa um produto, antes dos cinco traços, e um contêiner, depois do cinco traços. Na saída, cada linha representa um contêiner e os produtos que estão armazenados nele.

## Exemplo

Entrada:

    TNT:EXPLOSIVO+BLINDADO
    RDX:EXPLOSIVO+BLINDADO
    TATP:EXPLOSIVO+BLINDADO
    AREIA:INERTE+QUALQUER_UM
    ALUMINIO:INERTE+NAO_COM_EXPLOSIVO
    AMONIA:VOLATEL+VENTILADO
    AMOSTRA_BIOLOGICA:VOLATEL+NAO_COM_EXPLOSIVO
    ETANAL:VOLATEL+VENTILADO
    FORMOL:VOLATEL+QUALQUER_UM
    ANESTESICO:INERTE+NAO_COM_EXPLOSIVO
    -----
    BLINDADO
    VENTILADO
    BASICO

Saída

    BLINDADO:TNT,RDX,TATP,AREIA,FORMOL
    VENTILADO:AMOSTRA_BIOLOGICA,ANESTESICO,ALUMINIO,ETANAL,AMONIA
    BASICO:







fonte: Domain Driven Design, Eric Evans

