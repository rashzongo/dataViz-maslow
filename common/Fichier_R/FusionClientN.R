#lire le fichier client 2 et client 10 puis faire la fusion un en dessous de l'autre
client2 <- read.csv("Clients_1.csv", header = TRUE, sep = ",", dec = ".",check.names = FALSE)
client3 <- read.csv("Clients_9.csv", header = TRUE, sep = ",", dec = ".",check.names = FALSE)
View(client2)
View(client3)
datafile <- rbind(client2,client3)
write.csv(datafile,"Client_Global.csv",row.names = FALSE ,quote = FALSE)
View(datafile)