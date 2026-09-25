here is the current documentation and the endpoint i need to work with.

Authorization
Request URL
rapidapi.com

X-RapidAPI-Key
471ebba5a3XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

Headers

X-RapidAPI-Host
*
bayut16.p.rapidapi.com


1. Agents
GET
/agent/searchByName

Query Parameters

page
Optional
1
Integer. - Page number (starts from 1)

Results per page: 20
Default: 1
Minimum: 1
langs
Optional
en
String. - Language code: en, ar, ru, zh

query
*
anna
String. - Agent name to search for

Searches by name only

2. GET
/agent/details

Query Parameters

langs
Optional
en
String. - Comma-separated language codes: en, ar, ru, zh

agent_id
*
2518657
String. - Agent external ID

Get this from /agent-search or /agent-search-by-name response

3. GET
/agent/properties
Query Parameters

page
Optional
1
Integer. - Page number (starts from 1)

Results per page: 25
Default: 1
Minimum: 1
langs
Optional
en
String. - Comma-separated language codes: en, ar, ru, zh

owner_id
*
2243594
String. - Agent owner ID

Get from /agent-details response (ownerID field)
This is different from externalID — the ownerID links agents to their listings
4. GET
/agent/search
Query Parameters

category
Optional
residential
String. - Property category the agent specializes in

location_ids
Optional
5003,5460
String. - Comma-separated location external IDs

Get IDs from /autocomplete endpoint (externalID field)
page
Optional
1
Integer. - Page number (starts from 1)

Results per page: 40
Default: 1
Minimum: 1
purpose
Optional
for-sale
String. - Transaction type to filter agents by

langs
Optional
en
String. - Language code: en, ar, ru, zh

completion_status
Optional
any
String. - Filter agents by completion status of their listings


5. Location
GET
location/autocomplete
Query Parameters

langs
Optional
en
String. - Comma-separated language codes for localized results

Available: en (English), ar (Arabic), ru (Russian), zh (Chinese)
Example: en,ar returns English + Arabic names
Default: en
query
*
dubai
String. - Location search query

Examples: dubai marina, palm jumeirah, downtown dubai
Minimum 1 character

6. Property Search
GET
/property/details
Query Parameters

langs
Optional
en
String. - Language code for response

Available: en, ar, ru, zh
Default: en
external_id
*
13495633
String. - Property external ID

Get this from /search-property response (externalID field)
Example: 13495633

7. GET
/property/search
Query Parameters

sort_order
Optional
popular
String. - Sort order for results

popular — most popular (default)
latest — newest listings
verified — TruCheck verified first
trubroker_first — TruBroker agents first
lowest_price — cheapest first
highest_price — most expensive first
property_type
Optional
apartments,villas
String. - Comma-separated property types

Use residential or commercial to search all sub-types
Residential types: apartments, townhouses, penthouse, villas, villa-compound, hotel-apartments, residential-plots, residential-floors, residential-building
Commercial types: offices, warehouses, commercial-villas, commercial-plots, commercial-buildings, industrial-land, showrooms, shops, labour-camps, bulk-units, commercial-floors, factories, mixed-use-land, commerical-properties
developer_ids
Optional
String. - Comma-separated developer IDs to filter by specific developers

page
Optional
1
Integer. - Page number (starts from 1)

Results per page: 24
Default: 1
Minimum: 1
rent_frequency
Optional
String. - Rent payment frequency (only for for-rent purpose)

Default: yearly
Options: yearly, monthly, weekly, daily
price_min
Optional
200000
Integer | Null. - Minimum price in AED

For sale: purchase price
For rent: annual rent amount
For Buy Transaction: 200000, 225000, 250000
For Rent Transaction: 20000, 30000, 40000
Default: 200000
Minimum: 0
langs
Optional
en
String. - Comma-separated language codes

Available: en, ar, ru, zh
Example: en,ar returns English + Arabic
Default: en
agency_ids
Optional
String. - Comma-separated agency external IDs to filter by specific agencies

Examples:- 10212, 6168, 6415
has_360_tour
Optional
true
Boolean. - Filter properties that have 360° virtual tours

amenities
Optional
Swimming Pool,Security Staff
String. - Comma-separated amenity names

Use /amenities-search endpoint to find available amenities
Examples: Swimming Pool, Security Staff, Gym, Parking
agent_ids
Optional
String. - Comma-separated agent IDs to filter by specific agents

Examples: 474947, 632216
is_furnished
Optional
String. - Filter by furnishing status

furnished — furnished properties
unfurnished — unfurnished properties
baths
Optional
1,2
String. - Comma-separated number of bathrooms

Example: 1,2,3
area_min
Optional
800
Number | Null. - Minimum area in Square Feet (sqft)

For Buy Transactions: 800, 1000, 1500, 2000`
For Rent Transactions: 800, 1000, 1500, 2000`
Default: 800
Minimum: 0
location_ids
Optional
6901,5003
String. - Comma-separated location external IDs

Get IDs from /autocomplete endpoint (externalID field)
has_floorplan
Optional
true
Boolean. - Filter properties that have floor plans

completion_status
Optional
String. - Filter by completion status

completed — ready/built properties
under-construction — off-plan/under construction
any — all properties (omit this param for no filter)
area_max
Optional
2500
Number | Null. - Maximum area in Square Feet (sqft)

Default: 2500
Minimum: 0
price_max
Optional
2000000
Integer | Null. - Maximum price in AED

For sale: purchase price
For rent: annual rent amount
For Buy Transaction: 400000, 450000, 500000
For Rent Transaction: 50000, 50000, 85000
Default: 2000000
Minimum: 0
has_video
Optional
true
Boolean. - Filter properties that have video tours

rooms
Optional
0,1,2,3
String. - Comma-separated number of bedrooms

0 = Studio
Example: 0,1,2 for studio, 1-bed, 2-bed
purpose
*
String. - Transaction type

for-sale — properties for purchase
for-rent — properties for rent

8. Market Data
GET
/marketData/developers
Query Parameters

langs
Optional
en
String. - Language code: en, ar, ru, zh

page
Optional
1
Integer. - Page number (starts from 1)

Results per page: 80
Default: 1
Minimum: 1
query
*
emaar
String. - Developer name to search for

Searches by name only
Example: emaar, damac, sobha

9. GET
/marketData/amenities
Query Parameters

query
*
swimming
String. - Search query for amenities

Examples: swimming, gym, security, parking, sauna
Returns matching amenity names that can be used in /search-property amenities parameter

10. GET
/marketData/transactions


Query Parameters

location_ids
Optional
5003,5460
String. - Comma-separated location external IDs from /autocomplete

page
Optional
1
Integer. - Page number (starts from 1)

Results per page: 20
Default: 1
Minimum: 1
area_max
Optional
5000
Number | Null. - Maximum area in sqft

Default: 5000
Minimum: 0
time_period
Optional
12m
String. - Time period for transaction data

1m — last 1 month
3m — last 3 months
6m — last 6 months
12m — last 12 months (default)
24m — last 24 months
price_min
Optional
200000
Integer | Null. - Minimum price in AED

Default: 200000
Minimum: 0
category_ids
Optional
residential
String. - Comma-separated category names or external IDs

Names: residential, commercial, apartments, villas, townhouses, penthouse, offices, shops, etc.
Or external IDs: 1 (residential), 2 (commercial), 4 (apartments), 3 (villas)
Example: apartments,villas,townhouses or 4,3,16
beds
Optional
0,1,2,3
String. - Comma-separated bedrooms filter

0 = Studio
price_max
Optional
5000000
Integer | Null. - Maximum price in AED

Default: 5000000
Minimum: 0
completion_status
Optional
any
String. - Filter by completion status

sort_by
Optional
date_desc
String. - Sort order for transactions

date_desc — newest first (default)
date_asc — oldest first
price_desc — highest price first
price_asc — lowest price first
area_desc — largest area first
area_asc — smallest area first
area_min
Optional
800
Number | Null. - Minimum area in sqft

Default: 800
Minimum: 0
purpose
*
String. - Transaction type

for-sale — sale transactions
for-rent — rental transactions

11. Agencies
GET
/agency/properties
Query Parameters

langs
Optional
en
String. - Comma-separated language codes: en, ar, ru, zh

page
Optional
1
Integer. - Page number (starts from 1)

Results per page: 25
Default: 1
Minimum: 1
agency_external_id
*
106317
String. - Agency external ID

Get from /agency-search or /agency-search-by-name response (externalID field)
Example: 106317

12. GET
/agency/searchByName

Query Parameters

langs
Optional
en
String. - Language code: en, ar, ru, zh

page
Optional
1
Integer. - Page number (starts from 1)

Results per page: 80
Default: 1
Minimum: 1
query
*
sobha
String. - Agency name to search for

Searches by name only
Example: white, metropolitan, emaar

13. GET
/agency/details
Query Parameters

agency_id
*
8566
String. - Agency ID

Get from /agency-search response
Example: 8566
14. GET
/agency/agents
Query Parameters

page
Optional
1
Number. Page number (default: 1)

Default: 1
Minimum: 1
agency_id
*
10212
String. - Agency ID

Get from /agency-search or /agency-details response
Example: 10212

GET
/agency/search
Query Parameters

langs
Optional
en
String. - Comma-separated language codes: en, ar, ru, zh

page
Optional
1
Integer. - Page number (starts from 1)

Results per page: 40
Default: 1
Minimum: 1
location_id
*
1
String. - Location external ID

Get from /autocomplete endpoint (externalID field)
Example: 5001 (Dubai)
Example: 1 for whole of dubai, 3 for whole of Abu Dhabi





