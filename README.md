# Envoi - Hybrik SDK

This project is a Javascript SDK for the [Hybrik API](https://docs.hybrik.com/api/v1/HybrikAPI.html?#getting-started). 
It provides methods and examples for interacting with the Hybrik API using Node.js 20.

Envoi is a cloud platform that automates creating, managing, and distributing 24x7, live free ad-supported streaming television "FAST", Subscription or Pay-Per-View OTT (internet delivered) channels.

This SDK provides integration between the Envoi Distribution Service and Dolby's cloud media processing service and automates the creation of 3d Stereoscopic Video (3D Video) being distributed using Apple HTTP Live Streaming (HLS). Content processed by Envoi is encoded using the Dolby Profile 20 to generates multi-bitrate MultiView HEVC (MV-HEVC) MP4 and HLS renditions. 

Envoi supports all Hybrik API methods POST, PUT, GET, and DELETE. The API uses HTTP authentication for permitting API access, and a user-specific login call which returns an expiring token. This token needs to be passed into all API calls as part of the header.

A typical API session to submit and track a transcoding job would look like this:

Step 1 - Authenticate User (returns security token used in following calls)
Step 2 - Create Job (submits your job in JSON format)
Step 3 - Get Job Info (tracks status of your job)
Step 4 - Get Job Result (complete details of your job after completion or failure)
At the bottom of this document are downloadable samples for both JSON jobs as well as JavaScript libraries for easily incorporating the Hybrik API into your projects.

