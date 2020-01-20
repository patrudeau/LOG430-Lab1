# LOG430-Lab1

Initial solution for node.js mqtt connection

Pour lancer les services en local vous devez lancez les commandes suivantes dans des terminaux séparés:
1. node broker (pour lancer le broker)
2. node pub (pour lancer le publisher par défaut il publie dans le topic "trafic")
3. node sub trafic (pour lancer le subcriber avec un argument en ligne de commande)

Vous verez ensuite dans chacun des 3 terminaux les messages publiés sur le broker, pub et sub (si vous écoutez bien le topic trafic)