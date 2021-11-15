# booking_assignment

There are three endpoint to manage the booking.
You can export postman collection to your postman from `postman` folder in root directory.

# Minimum Requirement
Node version 12.0 and above install.

# Start the server

The express runs on the port on 3000 by default if there is no port number provided as env variable.
You can provide port number by setting `PORT` to specific value in env variable.

To install the dependencies, you can run:
```
npm install
```
To start server, you can run:
```
npm run start
```

There are three endpoints to manage the bookings:

To create a reservation, first endpoint is 
```
POST /reserve
```
This endpoint needs following payload:
```
{
    "first_name": string,
    "last_name": string,
    "email": string,
    "number_of_people": number,
    "checkIn_date": string,
    "checkOut_date": string
}
```
All the required fields. The checkIn_date and checkOut_date fields should be in format `DD/MM/YYYY`. This endpoint will create a new reservation for you. If it is success, it will response with 201 with reservation id as `id` field.
Also, number_of_people could be maximum 3.
checkIn_date and checkOut_date dates shouldn't be more than 3 days.

You can get and delete reservation with above `id`.

To get reservation, you can get reservation with above `id`.
```
GET /reserve/:id
```

This will response with 200 with json reservatin info, if reservation exists with that `id`
If that reservation is not found, it will response with 404.

To delete reservation with above `id`.
```
DELETE /reserve/:id
```

This will have response with 200 if reservation is found, and it will be deleted.
If that reservation is not found, it will response with 404.
# Run the test

In order to run the test and linter, you need to install all dependencies and run the following command:

To install the dependencies, you can run:
```
npm install
```
To run the linter, you can run
```
npm run lint
```
To run the test with coverage, you can run:
```
npm run test
```