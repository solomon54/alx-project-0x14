# ***🎬 MoviesDatabase API Reference***

## 💡 API Overview

The **MoviesDatabase API** provides a comprehensive and constantly updated data source for **movies, TV shows, and actors**. It covers over **9 million titles** (including movies, series, and episodes) and **11 million actors/crew members**.

### Key capabilities include

* Access to detailed metadata: ratings, awards, box office, full biographies, and trailer URLs.
* Advanced filtering, sorting, and predefined title collections (e.g., Top 250, Most Popular).

***

## ⚙️ API Version

The API documentation does not explicitly label a semantic version number (e.g., v1 or 1.0) in the primary paths. Developers should interface with the documented endpoint structures directly.

***

## 🌐 Available Endpoints

The API endpoints are organized into three primary categories for titles, actors, and utility functions.

### Titles Endpoints

| Endpoint Path | Method | Description |
| :--- | :--- | :--- |
| `/titles` | GET | Retrieve a list of titles based on filters (`genre`, `year`, `titleType`, `list`). |
| `/titles/{id}` | GET | Fetch **full details** for a single title using its unique IMDb ID. |
| `/titles/{id}/ratings` | GET | Get the rating summary (average rating, vote count) for a specific title. |
| `/titles/series/{id}` | GET | List episodes for a given series ID. |
| `/titles/x/upcoming` | GET | Retrieve a list of upcoming titles. |

### Search Endpoints

| Endpoint Path | Method | Description |
| :--- | :--- | :--- |
| `/titles/search/title/{title}` | GET | Search for titles by keyword or partial title string. |
| `/titles/search/keyword/{keyword}` | GET | Search titles by exact keyword match. |

### Actors & Utility Endpoints

| Endpoint Path | Method | Description |
| :--- | :--- | :--- |
| `/actors` | GET | Retrieve a paginated list of actors. |
| `/actors/{id}` | GET | Fetch complete details and known-for titles for a specific actor ID. |
| `/title/utils/genres` | GET | Return a list of all available title genres. |

***

## 📝 Request & Response Structure

### Request Parameters

All query parameters are **optional** unless otherwise noted by the specific endpoint path.

| Parameter Name | Type | Description |
| :--- | :--- | :--- |
| `id` | Path (STRING) | The IMDb identifier for a title (e.g., `tt0111161`) or actor. **Required.** |
| `info` | Query (STRING) | **Critical for performance.** Controls the depth of the returned object (e.g., `mini_info`, `base_info`, `extendedCast`). Defaults to `mini_info`. |
| `limit` | Query (NUMBER) | The maximum number of results per page. **Max value is 50.** |
| `page` | Query (NUMBER) | Used for offset in paginated results. Defaults to `1`. |
| `genre` | Query (STRING) | Filter results by a specific genre (case sensitive and capitalized). |

### Response Format

The API returns data in **JSON format**. Successful responses (`200 OK`) include a root object containing the `results` array, as well as pagination metadata if applicable.

| Root Key | Type | Description |
| :--- | :--- | :--- |
| `results` | Array | The array containing the requested data objects (Titles, Actors, or Ratings). |
| `page` | Number | The current page number. |
| `next` | String | URL path to the next page of results (for paginated endpoints). |
| `entries` | Number | The total number of entries available for the current query. |

#### Example: Rating Object Model

A response from the `/titles/{id}/ratings` endpoint provides a concise rating object:

```json
{
  "results": [
    {
      "tconst": "tt0000003",
      "averageRating": 6.5,
      "numVotes": 1631
    }
  ]
}
````

-----

## 🔑 Authentication

Access to the MoviesDatabase API is secured using the standard **RapidAPI subscription model**. All requests must include the following required HTTP headers:

| Header Name | Value | Purpose |
| :--- | :--- | :--- |
| `X-RapidAPI-Key` | Your Unique API Key | Validates your identity and subscription status. |
| `X-RapidAPI-Host` | The API Host Domain | Identifies the target API service. |

-----

## ⚠️ Error Handling

The API adheres to standard HTTP status codes for robust error reporting.

| Status Code | Error Classification | Description |
| :--- | :--- | :--- |
| **`200 OK`** | Success | Request processed successfully. |
| **`400 Bad Request`** | Client Error | Missing or invalid required path/query parameters. |
| **`401 Unauthorized`** | Authentication Error | The API key (`X-RapidAPI-Key`) is missing or invalid. |
| **`404 Not Found`** | Resource Error | The specified endpoint or requested resource ID does not exist. |
| **`429 Too Many Requests`** | Rate Limit Error | The user has exceeded the allocated request limit for their subscription plan. |

-----

## 📈 Usage Limits & Best Practices

### Usage Limitations

* **Pagination:** The maximum number of results that can be requested per page is strictly limited to **50 entries** (via the `limit` parameter).
* **Lists:** Predefined lists (e.g., `most_pop_movies`) also have a maximum fetch size of **50 entries** per request.

### Best Practices

1. **Payload Optimization:** **Crucially, use the `info` query parameter** to limit the returned data to only the fields you need (e.g., `mini_info` or `base_info`). This significantly improves response time and reduces bandwidth consumption.
2. **Rate Limit Management:** When receiving a `429` error, implement a retry mechanism using **exponential backoff** to prevent further hammering the API and incurring higher costs or suspension.
3. **Null Handling:** The full `title` object is extensive. Always anticipate and programmatically handle potential `null` values for optional metadata fields (e.g., `productionBudget`, `reviews`).

-----
