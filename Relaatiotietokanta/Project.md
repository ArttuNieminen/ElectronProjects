# Relaatio tietokanta projekti:
- Aiheena Koulun tietokanta.
- Malli Draw.io
- Vähintään 5 taulua.
- Frontendillä ei väliä (react + electron)
- MySql Tietokantana

## Malli taulu ![image1](./Pictures/Relaatiotietokanta.drawio.png)

## Tietokanta on lokaali Mysql Server.
Serveri on tehty tämän sivun ohjeiden mukaan. https://www.prisma.io/dataguide/mysql/setting-up-a-local-mysql-database
Kun serveri on valmis sen voi käynnistää MySql command clientissä johon laitetaan serverin salasana ja se käynnistyy.

Lisäsin serverille teitokannan komenolla CREATE DATABASE RelationDB
Sen jälkeen menin databaseen USE RelationDB ja aloin lisämään sinne tauluja:

- CREATE TABLE Student (ID integer PRIMARY KEY, Forenames varchar(100), Surname varchar(60), Birthdate date)
- CREATE TABLE Course (ID integer PRIMARY KEY, name varchar(100), points integer)
- CREATE TABLE Teacher (ID integer PRIMARY KEY, Forenames varchar(100), Surname varchar(60))
- CREATE TABLE Courseteachers (ID integer , TeacherID integer, CourseID integer, PRIMARY KEY (ID), FOREIGN KEY (TeacherID) REFERENCES Teacher(ID),FOREIGN KEY (CourseID) REFERENCES Course(ID))
- CREATE TABLE Classattendance (ID integer, StudentID integer, CourseID integer, Madedate Date, Mark varchar(20),
PRIMARY KEY (ID), FOREIGN KEY (StudentID) REFERENCES Student(ID),FOREIGN KEY (CourseID) REFERENCES Course(ID)) 
- CREATE TABLE Coursecomplete (ID integer, StudentID integer, CourseID integer, Completedate Date, Points integer, Grade integer,
PRIMARY KEY (ID), FOREIGN KEY (StudentID) REFERENCES Student(ID),FOREIGN KEY (CourseID) REFERENCES Course(ID)) 

Huomasin että minulta puuttuikin Student taulusta yksi sarake ja lisäsin sen. ALTER TABLE Student ADD Class varchar(20)
Huomasin myös että oisi kannattanut pistää taulujen ID NOT NULL ja AUTO_INCREMENT mutta lisäystä ei voinut tehdä kun ID on jo FOREIGN KEY
muutamassa taulussa. Tämän voi ohittaa käyttämällä SET FOREIGN_KEY_CHECKS = 0 , tekemällä asiat ja sitten tarkistus takaisin SET FOREIGN_KEY_CHECKS = 1. Muutokset tein tällä tyylillä ALTER TABLE Classattendance MODIFY ID integer NOT NULL AUTO_INCREMENT

Lisäsin myös FOREIGN KEY:lle NOT NULL.

Seuraavaksi lisäsin yhden rivin Student tauluun jotta voin testata yhteyttä.

Käytin projektissa pohjana omaa Electron-React yhdistelmää node.js localhost serverillä.

Serverillä tuli ongelma saada yhdistettyä serveriin ja sanoi Client does not support authentication protocol requested by server

Tämä ongelma hävisi kun vaihdoin mysql mysql2 eli asensins sen npm i mysql2 ja vahoin 
var mysql = require('mysql'); => var mysql = require('mysql2');

Projektia tehdessä ei tullut suuria ongelmia paitsi kun piti poistaa jokin joka oli muissa tauluissa foreign key. Tämän pystyi ohittamaan sitten että poisti sarakkeen rajoituksen kuten 
            
            ALTER TABLE Tablename drop CONSTRAINT FK_Constraintname 

ja lisäsi sen uusilla rajoituksilla kuten:
    
            ALTER TABLE TABLENAME ADD CONSTRAINT  FK_Constraintname FOREIGN KEY (FId) REFERENCES OTHERTABLE (Id) 
            ON DELETE CASCADE ON UPDATE CASCADE; 
            
ON DELETE CASCADE lisänä joka antoi sen tuhotua samalla kun poistaa sen liitetyn rivin ja ON UPDATE CASCADE antaa vaihtaa sen tyyppiä jos tarve vaatii. Droppaamisessa oli ongelmia kun en tiennyt rajoituksen nimeä mutta sen sai selville tällä:

            SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS WHERE TABLE_NAME = 'Courseteachers'; 
            
joten droppasin sitten tällä:

            ALTER TABLE Courseteachers DROP FOREIGN KEY courseteachers_ibfk_1, DROP FOREIGN KEY courseteachers_ibfk_2; 
            
ja lissäsin tällä: 

            ALTER TABLE Courseteachers ADD CONSTRAINT FK_Teacher_Courseteachers FOREIGN KEY (TeacherID) REFERENCES Teacher(ID) ON DELETE CASCADE ON UPDATE CASCADE
            
            ALTER TABLE Courseteachers ADD CONSTRAINT FK_Course_Courseteachers FOREIGN KEY (CourseID) REFERENCES Course(ID) ON DELETE CASCADE ON UPDATE CASCADE; 

Ja samaan tyyliin Kurssisuorituksille ja Tuntimenrkinnöille.