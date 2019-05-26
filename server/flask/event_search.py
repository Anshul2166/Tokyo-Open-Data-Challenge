
'''
Author: < Johnny Hsu, aka. Yu Wei, Hsu>
Date: 09/12/2016>
Description:

'''

import requests
import json
import datetime
import argparse


# parser = argparse.ArgumentParser(usage="event_search.py event_location start_date end_date")
# parser.add_argument("event_location", type = str, help = "assign event location, such as New-York-City")
# parser.add_argument("start_date", type = str, help = "assign event start date <yyyymmdd>, such as 20150101")
# parser.add_argument("end_date", type = str, help = "assign event end date <yyyymmdd>, such as 20150131")
# args = parser.parse_args()

def get_event(user_key, event_location, start_date, end_date, event_features, fname):
	'''
	Description:
   	This function handles event search. It performs the requested search, returning the results as an json file. 
   	See the search box at http://eventful.com/events for an example interface.
    
 
    Parameters:
    key: a str that indicates Application key as provided by Eventful

    location: A location name to use in filtering the search results. 
    		  Locations in the form "San Diego", "San Diego, TX", "London, United Kingdom", 
    		  and "Calgary, Alberta, Canada" are accepted, as are postal codes ("92122") 
    		  and venue IDs ("V0-001-000268633-5"). Common geocoordinate formats ("32.746682, -117.162741") are also accepted, 
    		  but the "within" parameter is required in order to set a search radius. (optional)
    		  see the location argument at http://api.eventful.com/docs/events/search

   	start_date: a str that determines the start date for searching, format: "yyyymmdd", eg. "20160101"

   	end_date: a str that determines the end date for searching, format: "yyyymmdd", eg. "20160101"
   	out_format: a list determines the Output Parameters
   				see the Output Parameters at http://api.eventful.com/docs/events/search    
    
    Return: None

    '''
	data_lst = [] # output
	start_year = int(start_date[0:4])
	start_month = int(start_date[4:6])
	start_day = int(start_date[6:]) 
	
	end_year = int(end_date[0:4])
	end_month = int(end_date[4:6])
	end_day = int(end_date[6:]) 
	
	start_date = datetime.date(start_year, start_month, start_day)
	end_date = datetime.date(end_year, end_month, end_day)
	step = datetime.timedelta(days=1)

	while start_date <= end_date:

		date = str(start_date.year) 
		if start_date.month < 10:
			date += '0' + str(start_date.month)
		else:
			date += str(start_date.month)

		if start_date.day < 10:
			date += '0' + str(start_date.day)
		else:
			date += str(start_date.day)
		date += "00"
		date += "-"	+ date


		url = "http://api.eventful.com/json/events/search?"
		url += "&app_key=" + user_key 
		url += "&location=" + event_location
		url += "&date=" + date
		url += "&page_size=250" 
		url += "&sort_order=popularity"
		url += "&sort_direction=descending"
	
		data = requests.get(url).json()
		# print(data)


		try:
			for i in range(len(data["events"]["event"])):
				data_dict = {}
				for feature in event_features:
					data_dict[feature] = data["events"]["event"][i][feature]
				data_lst.append(data_dict)
		except:
			 pass

		start_date += step

	# return data_lst
	

# def event_output_csv(fname, data_lst, header):
	# file = open(fname, "w",encoding="utf-8")

	# # write the table head
	# lst2 = []
	# lst2.extend(event_features)
	# table_header = ",".join(lst2) + "\n"
	# file.write(table_header)

	# # write the data
	# for i in range(len(data_lst)):
	# 	lst2 = []
	# 	for feature in event_features:
	# 		lst2.append((str(data_lst[i][feature])))
	# 	file.write(",".join(lst2) + "\n")
	# file.close()
	return data_lst

def main(event_location,start_date,end_date,user_key):
	'''
	Description:
   	This function handles event search. It performs the requested search, returning the results as an json file. 
   	Write the all returned result into csv file.
    
    Variable Definition:
  	event_key: a str that indicates Application key as provided by Eventful. Apply for key at http://api.eventful.com/keys
  	event_location: a location to use in filtering the search result. eg. "New York"
  	start_date: a str that determines the start date for searching, format: "yyyymmdd"
	end_date: a str that determines the end date for searching, format: "yyyymmdd"
    event_format: a list contains all Output Parameters
    event_fname: output csv file name


    Return: None
   

    '''
	# event_location = "New York"
	# start_date = "20160929"
	# end_date = "20160930"
	# event_location = args.event_location.replace("-"," ")
	# start_date = args.start_date
	# end_date = args.end_date
	event_features = ["latitude","longitude", "start_time", "stop_time", "all_day"]
	event_features += ["city_name", "region_name", "postal_code"]
	event_features += ["calendar_count","comment_count","geocode_type","venue_url","venue_name","title","description","url"]
	event_fname = "events.csv"

	return get_event(user_key, event_location, start_date, end_date, event_features, event_fname)

	# event_fname = "events2.json"
	# event_output_csv(event_key, event_location, start_date, end_date, event_fname)



if __name__ == '__main__':
    res=main("tokyo","20190601","20190630","nvm34KtGGHhNWmVW")