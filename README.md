<div align="center">
<h1>TravelCon (Web Interface)</h1>
TravelCon is a system that makes reservation-booking processes painless and secure. This project was developed by PantherHackers' HackSquad at UGAHacks 4 in February, 2019.
</div>

<h2 align="center">Overview</h2>

TravelCon has two goals:
1. Making a reservation or signing up for ticketed events should be as easy for customers as calling an Uber.
2. Hosts should be able to verify their participants' identities and check them in with zero effort.

We accomplish this through our app in several steps:
* Customers create a profile using a photograph of themself.
* Hosts create a listing in our system.
* Customers make their reservation for a listing.
* On-site, the customer has their photograph taken by a device running TravelCon software, which is used to verify the customer's identity and admit them into the location.

<h2 align="center">Architecture</h2>

The whole of the system as developed at the hackathon has four components:
* Web front-end
* Web back-end
* AWS Rekognition (Facial recognition service)
* Internet-connected camera/lock device ([travelcon-pi](https://github.com/lukedsmalley/travelcon-pi))

This repository contains the web interface and server portions of the project, written in HTML/CSS/JavaScript and utilizing the Node.js runtime.