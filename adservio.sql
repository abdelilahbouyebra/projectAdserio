-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 29 Novembre 2018 à 09:37
-- Version du serveur :  5.7.24-0ubuntu0.16.04.1
-- Version de PHP :  7.0.32-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `adservio`
--

-- --------------------------------------------------------

--
-- Structure de la table `candidats`
--

CREATE TABLE `candidats` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `dateEmbouche` varchar(12) NOT NULL,
  `dateValidCrtSejour` varchar(12) NOT NULL,
  `postOcupe` text NOT NULL,
  `dateEntretienInd` varchar(12) DEFAULT NULL,
  `visiteMedical` int(1) DEFAULT '0',
  `entretienIndividuel` int(1) DEFAULT '0',
  `commentaire` text,
  `isPeriodEsaiValid` int(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `candidats`
--

INSERT INTO `candidats` (`id`, `nom`, `prenom`, `dateEmbouche`, `dateValidCrtSejour`, `postOcupe`, `dateEntretienInd`, `visiteMedical`, `entretienIndividuel`, `commentaire`, `isPeriodEsaiValid`) VALUES
(108, 'bouyebra', 'abdelilah', '2018-10-22', '2018-12-14', 'Ingénieur java ee', '2018-11-17', 0, 0, 'sdfsdfsdfsdfsd', 0),
(111, 'AYARI', 'Haythem', '2017-07-17', '2019-02-09', 'INGéNIEUR JAVA', NULL, 0, 0, NULL, 0),
(112, 'BEN ABDELLAH', 'Ilyas', '2018-06-11', '2019-05-17', 'INGéNIEUR DéVELOPPEMENT', NULL, 0, 0, NULL, 0),
(113, 'BEN ABID ', 'AHMED', '2018-09-24', '2019-04-18', 'INGéNIEUR DEVOPS', NULL, 0, 0, NULL, 0),
(114, 'BEN AMARA', 'SLIM', '2018-01-15', '2019-03-15', 'INGéNIEUR INFORMATIQUE', NULL, 0, 0, NULL, 0),
(115, 'BOUDRIGUA', 'HABIB', '2017-10-01', '2018-12-08', 'INGéNIEUR php', NULL, 0, 0, NULL, 0),
(116, 'BOURBIA', 'Souha', '2017-07-17', '2019-08-23', 'INGéNIEUR JAVA', NULL, 0, 0, NULL, 0),
(117, 'BOUZIDI', 'Yassine', '2017-09-18', '2019-07-19', 'INGéNIEUR', NULL, 0, 0, NULL, 0),
(118, 'CHEIKH LARBI', 'Achref', '2018-01-15', '2019-03-08', 'INGéNIEUR DEVOPS', NULL, 0, 0, NULL, 0),
(119, 'CHERIF', 'nasr', '2018-02-15', '2019-03-22', 'INGéNIEUR', NULL, 0, 0, NULL, 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `created`) VALUES
(3, 'abdelilah', 'bouyebra', 'abdelilah.bouyebra@gmail.com', 'abdelilah', '2018-11-20 00:00:00'),
(10, 'test', 'test', 'test@test.com', 'test', '2018-11-28 14:57:19'),
(11, 'aaa', 'aaa', 'aaa', 'aaa', '2018-11-28 19:17:13');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `candidats`
--
ALTER TABLE `candidats`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `candidats`
--
ALTER TABLE `candidats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
