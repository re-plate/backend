[![Build Status](https://travis-ci.org/re-plate/backend.svg?branch=master)](https://travis-ci.org/re-plate/backend)
[![Coverage Status](https://coveralls.io/repos/github/re-plate/backend/badge.svg?branch=develop)](https://coveralls.io/github/re-plate/backend?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/db6e138ab94fed11b5ba/maintainability)](https://codeclimate.com/github/re-plate/backend/maintainability)
[![](https://img.shields.io/badge/Protected_by-Hound-a873d1.svg)](https://houndci.com)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/re-plate/backend.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/re-plate/backend/context:javascript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/re-plate/backend/blob/develop/LICENSE)

# backend

API Service for replate application 🚀.

> Link to API: https://re-plate.herokuapp.com/

# How to setup the project

- Create an account on [ElephantSQl](https://customer.elephantsql.com/instance)
- Create a database instance in ElephantSQL and copy the connection string (URL)
- create a `.env` file at the root of the project, copy the content of `.env.example` into it.
- Assign the URL above to the `DB_URL` in `.env` file
- npm install or yarn install
- npm migrate or yarn migrate
- npm run dev or yarn dev

## Built With
<ul>
<li><a href="https://nodejs.org/en/">Nodejs</a></li>
<li><a href="https://expressjs.com/">Expressjs</a></li>
</ul>

## Testing Tools
<ul>
<li><a href="https://mochajs.org/">Mocha</a></li>
<li><a href="https://www.chaijs.com/">Chai</a></li>
</ul>


## Getting Started

<h3>Prerequisites</h3>
You need Nodejs Installed to be able to run this project on your machine.

<h3>Installing<h3>
<ul><li>Clone Repository</li></ul>
<pre><code>git clone https://github.com/re-plate/backend</code> </pre>
<br>
<br>

<ul><li>Change Directory To Backend</li></ul>
<pre><code>cd backend</code></pre>
<br>
<br>

<ul><li>Install Dependencies</li></ul>
<pre><code>npm install</code></pre>
<br>
<br>

<ul><li>Start Application</li></ul>
<pre><code>npm start</code></pre>
<br>
<br>

<ul><li>Run Test</li></ul>
<pre><code>npm test</code></pre>
<br>
<br>

<ul><li>Run Coverage Report</li></ul>
<pre><code>npm run coveralls</code></pre>
<br>


<h2>API Routes</h2> <br>

| DESCRIPTION                     | HTTP METHOD   | ROUTES                                        | ACCESS        |
| ---------------                 | --------------|-----------------------------------------------|---------------|
| Register User                   | POST          | /api/v1/auth/register                         | PUBLIC        |
| Login User                      | POST          | /api/v1/auth/login                            | PUBLIC        |




<pre>
<h3>Register Route </h3>
<code>
Access: Public
Method: POST
Route: /api/v1/auth/register
Payload: {
    name: STRING (required),
    username: STRING (required),
    email: STRING (required),
    password: STRING (required),
    type: INTEGER (required),
    phone: STRING (optional)
}
</code>
</pre>

<pre>
<h3>Login Route </h3>
<code>
Access: Public
Method: POST
Route: /api/v1/auth/login
Payload: {
    username: STRING (required),
    password: STRING (required)
}
</code>
</pre>

<pre>
<h3>Create Request Route </h3>
<code>
Access: Private
Method: POST
Route: /api/v1/requests
headers: {
    Authorization: token
}
Payload: {
    name: STRING (required),
    food_type: STRING (required),
    pickup_date: STRING (required),
    pickup_time: STRING (required),
    comment: STRING (optional),
    instruction: STRING (optional),

}
</code>
</pre>

<pre>
<h3>Get All Requests (Business) </h3>
<code>
Access: Private
Method: GET
Route: /api/v1/requests
headers: {
    Authorization: token
}
</code>
</pre>

<pre>
<h3>Get All Requests (Volunteer) </h3>
<code>
Access: Private
Method: GET
Route: /api/v1/requests/all
headers: {
    Authorization: token 
}
</code>
</pre>

<pre>
<h3>Get Request By Id </h3>
<code>
Access: Private
Method: GET
Route: /api/v1/requests/:id
headers: {
    Authorization: token
}
</code>
</pre>

<pre>
<h3>Update Request Route </h3>
<code>
Access: Private
Method: PUT
Route: /api/v1/requests/:id
headers: {
    Authorization: token
}
Payload: {
    name: STRING (required),
    food_type: STRING (required),
    pickup_date: STRING (required),
    pickup_time: STRING (required),
    comment: STRING (optional),
    instruction: STRING (optional),

}
</code>
</pre>

<pre>
<h3>Delete Request By Id </h3>
<code>
Access: Private
Method: DELETE
Route: /api/v1/requests/:id
headers: {
    Authorization: token
}
</code>
</pre>

<pre>
<h3>Accept Request By Id (Volunteer)</h3>
<code>
Access: Private
Method: POST
Route: /api/v1/requests/:id/action
headers: {
    Authorization: token
}
Payload: {
    status: INTEGER (required)
}
</code>
</pre>

<pre>
<h3>Search Business (Volunteer)</h3>
<code>
Access: Private
Method: GET
Route: /api/v1/search/business?name=query
headers: {
    Authorization: token
}
</code>
</pre>

