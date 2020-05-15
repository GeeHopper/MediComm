-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 15. Mai 2020 um 21:44
-- Server-Version: 10.4.11-MariaDB
-- PHP-Version: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `medicomm`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `fax` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `docnumber` varchar(255) NOT NULL,
  `establishmentnumber` varchar(255) NOT NULL,
  `field` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `doctors`
--

INSERT INTO `doctors` (`id`, `phone`, `fax`, `url`, `docnumber`, `establishmentnumber`, `field`) VALUES
(13, 'stevens', 'stevens', 'ha', '13', 'stevens', 'stevens');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `insurednumber` varchar(255) NOT NULL,
  `healthinsurance` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `patients`
--

INSERT INTO `patients` (`id`, `insurednumber`, `healthinsurance`) VALUES
(10, 'lolololo', 'lolololo'),
(14, 'lolololo', 'lolololo'),
(15, 'asdasd', 'AOK'),
(16, 'asdasd', 'hoho'),
(17, 'okokok', 'xxk');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilepic` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`id`, `mail`, `password`, `profilepic`, `firstname`, `lastname`, `address`, `created_at`) VALUES
(1, 'lolololo', '$2y$10$M87NNbInnqZFIiUURdHo7uYWF5/QgkH5PUa3S66kGTm2zLd9XIt0q', 'lolo', 'lolo', 'lolololo', 'lolololo', '2020-05-12 22:28:43'),
(2, 'lolololoss', '$2y$10$zbQX5puiGVVH42OdEuY73.uv2am9CM5C6d3Nv.d75JFztYGZKpru6', 'lolo', 'lolo', 'lolololo', 'lolololo', '2020-05-12 22:34:24'),
(3, 'lolololoss', '$2y$10$E4LGiwutS5d/DtmSVuTPNeaTY7ywPHbbUwNFfTIOWzUcOsf3kNCdS', 'lolo', 'lolo', 'lolololo', 'lolololo', '2020-05-12 22:45:16'),
(4, 'lolololoss', '$2y$10$RPoTC2ztXJn83yS7EtqE1uKM.m1fGiAzEQOUDX2JU1jTkNjdy9Mo2', 'lolo', 'lolo', 'lolololo', 'lolololo', '2020-05-12 22:47:20'),
(5, 'lolololoss', '$2y$10$.vmqWGMRHpZAMC.ZuxEoku2hlaAHSb6Lxslw338TkvlQDbh6p4eBC', 'lolo', 'lolo', 'lolololo', 'lolololo', '2020-05-12 22:47:29'),
(6, 'lolololoss', '$2y$10$0Lh1rqxQuhpCrJHvA7zX5.YjdrmtQzWIHkMHJQ8/nQd0d6BSEk3Wy', 'lolo', 'lolo', 'lolololo', 'lolololo', '2020-05-12 22:49:11'),
(7, 'lolololoss', '$2y$10$OYlOCW9SLw0aSzFTgMLVlemrrVHo6MJOsVTI0h8fnCj2yDZq/GdaG', 'lolo', 'lolo', 'lolololo', 'lolololo', '2020-05-12 22:52:31'),
(8, 'lolololoss', '$2y$10$BSI/bj3sdLY8YOhfHOoKaeuTFSoeJCcxqw114vxbf2rZ/UBeh95He', 'lolo', 'lolo', 'lolololo', 'lolololo', '2020-05-12 22:53:58'),
(9, 'lolololoss', '$2y$10$damai7e4mR07eCPk8AIBDOt9r.LdxJRFRccrU5t3JnTE5BuAoZ5Gi', 'lolo', 'lolo', 'lolololo', 'lolololo', '2020-05-12 22:54:35'),
(10, 'lolololoss', '$2y$10$PY0BDLbQKQFiF007.HKD6ecMZiAYGochvnW4I8Gic.WiYeX1DKU3e', 'lolo', 'lolo', 'lolololo', 'lolololo', '2020-05-12 22:57:40'),
(11, 'stevens', '$2y$10$JMdS7ZOkjO63aM3KCs6OhO5IR/YNUaFPhM9XldrXL/d53W0WNa2ye', 'stevens', 'stevens', 'stevens', 'stevens', '2020-05-12 23:36:23'),
(12, 'stevens', '$2y$10$6eGwO8HFSCpmnNUMSIXzIuei.pvAs.d2V25bX8B/z0ydRZw85IpNS', 'stevens', 'stevens', 'stevens', 'stevens', '2020-05-12 23:37:37'),
(13, 'stevens', '$2y$10$QIjOnEvP0Fm4qjMm/yBHL.75ATSNcblfJgdF6mW5lKfGGLehp6twe', 'stevens', 'stevens', 'stevens', 'stevens', '2020-05-12 23:38:28'),
(14, 'lolololo', '$2y$10$vjT0/biuqN.ME7pMXQSen.zj9R8BvV5IvO9J1zygVk5ixO4nbmCei', 'alina', 'm', 'lolololo', 'lolololo', '2020-05-13 15:48:09'),
(15, 'stevengee@t-online.de', '$2y$10$KSRU5dpiWat0wRMSgyihr.MDQ.7xmT662FCxqRFScM8iTvHny1yX2', 'steven', 'geiger', 'Saerbeck', '..', '2020-05-13 17:19:02'),
(16, 'maxk@web', '$2y$10$nG4MSMeeJCtMNGzYyE1tMeW/WFyWmqdzYahYkRyVntoMJC2ZYGC7C', 'Max', 'Krampe', 'Saerbeck', 'bild', '2020-05-13 18:46:52'),
(17, 'lukiboi@web.de', '$2y$10$QqnIPTXn3nelOB736mL7LOPkLgHgcQrq3swhL7ZmaC12kMeWB.grm', 'bild', 'lukas', 'vorn', 'bbeck', '2020-05-13 18:48:31');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user_types`
--

CREATE TABLE `user_types` (
  `id` int(11) NOT NULL,
  `type` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `user_types`
--

INSERT INTO `user_types` (`id`, `type`) VALUES
(10, 'patient'),
(0, 'doctor'),
(0, 'doctor'),
(0, 'doctor'),
(0, 'doctor'),
(0, 'doctor'),
(0, 'doctor'),
(0, 'doctor'),
(11, 'doctor'),
(12, 'doctor'),
(13, 'doctor'),
(14, 'patient'),
(15, 'patient'),
(16, 'patient'),
(17, 'patient');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
