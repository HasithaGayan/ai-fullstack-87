# Day 3 - How the Internet Works

## Request-Response Flow

User
↓
Browser
↓
DNS
↓
Server
↓
Response
↓
Browser Render


## Client and Server

Client:
The client is the browser or application that sends a request.

Server:
The server receives the request and sends back a response.

Client → Request → Server
Client ← Response ← Server


## DNS

DNS stands for Domain Name System.

DNS converts a domain name such as github.com into the IP address used to locate the correct server.

Simple idea:

Website name → DNS → Server address


## HTTP and HTTPS

HTTP stands for HyperText Transfer Protocol.

HTTP is used for communication between the browser and server.

Browser → HTTP Request → Server
Browser ← HTTP Response ← Server

HTTPS is the secure version of HTTP.

HTTPS encrypts the data sent between the browser and server.


## HTTP Request

An HTTP request can contain:

Method:
Tells the server what action is requested.
Example: GET or POST.

URL:
The address of the requested resource.

Headers:
Extra information about the request.

Body:
Data sent to the server when needed.


## HTTP Response

An HTTP response can contain:

Status Code:
Shows the result of the request.
Example: 200, 404 or 500.

Headers:
Extra information about the response.

Payload / Body:
The actual content or data returned by the server.
This can be HTML, JSON, images or other data.

## Real Network Request 1 - GitHub

Website: https://github.com

Request Method: GET
Status Code: 200
Type: document

What happened:
1. I entered github.com in the browser.
2. DNS helped locate GitHub's server.
3. The browser sent a GET request.
4. GitHub's server returned a successful response.
5. Status code 200 means the request succeeded.
6. The response type was document.
7. The browser received the page resources.
8. Chrome also loaded CSS, JavaScript, images and other files.
9. Some files were loaded from cache.
10. The browser rendered the final GitHub page.



## JSON API Example

API:
https://jsonplaceholder.typicode.com/posts/1

Request Method:
GET

Status Code:
200 OK

Response Type:
JSON

The response is a JSON object because it uses { }.

Keys:
- userId
- id
- title
- body

Example values:
- userId = 1
- id = 1

JSON is structured data that can be sent between systems.


## Failed Request Example

URL:
https://example.com/this-page-does-not-exist-12345

Request Method:
GET

Status Code:
404 Not Found

What happened:
The browser requested a page that does not exist.
The server received the request but could not find the requested resource.
The server returned HTTP status code 404.