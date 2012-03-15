-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 15, 2012 at 08:35 AM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `xss`
--

-- --------------------------------------------------------

--
-- Table structure for table `threat`
--

CREATE TABLE IF NOT EXISTS `threat` (
  `nid` bigint(20) NOT NULL AUTO_INCREMENT,
  `url` varchar(200) NOT NULL,
  `user` varchar(50) NOT NULL,
  `product` varchar(200) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `comment` text NOT NULL,
  `eventThreat` text NOT NULL,
  `fix` text NOT NULL,
  PRIMARY KEY (`nid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `threat`
--

