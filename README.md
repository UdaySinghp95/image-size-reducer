# API Documentation 


# GET /check-server
Description: Ensure that the server is running and connected to MongoDB 
Response:
Success (200 OK):
	Server is Up


____________________________________________________________________


# POST /add-image
Description: Adds images to a processing queue for compression and storage.

Request Body:
{
  "productName": "String",
  "imageUrls": ["String"]
}

productName: Name of the product associated with the images (required).
imageUrls: Array of image URLs to be processed (required).

Response:
Success (200 OK):
{ "jobId": "String" }
jobId: Identifier for the job added to the processing queue

Error (400 Bad Request)
{ "error": "Invalid request data" }

___________________________________________________________________

# GET /job-status/${jodId}
Description: Retrieves the status of a job from the processing queue.
Path Parameters: jobId: ID of the job to retrieve status for (required).
Response
Success (200 OK)
{ "jobId": "String", "state": "String"}

Error (404 Not Found):
 { "error": "Job not found" }

____________________________________________________________________



# GET /images/${productName}
Descriptions Retrieve processed images for a specific product name from the database.
Path Parameters: productName: Name of the product to retrieve images for (required).
Response:
Success (200 OK):  Renders an HTML page displaying processed images for the specified product name.
Error (400 Bad Request)
{ "error": "No images found for this product" }
