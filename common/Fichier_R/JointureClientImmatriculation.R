#joindre deux ficher 
# client que j'ai rassemble et immatriculation

install.packages("sqldf")
library(sqldf)

clientglobal <- read.csv("Client_Global.csv", header = TRUE, sep = ",", dec = "." ,check.names = FALSE)
Immatriculation <- read.csv("Immatriculations.csv", header = TRUE, sep = ",", dec = "." ,check.names = FALSE)

View(clientglobal)
View(Immatriculation)

q1 <- "select * from clientglobal c, Immatriculation i where c.immatriculation = i.immatriculation"

clientImmatriculation <- sqldf(q1)

write.csv(clientImmatriculation, "ClientMatriculation.csv",row.names = FALSE ,quote = FALSE)