import configparser
config = configparser.ConfigParser()
config.read("./config/keys.txt")

#Get credentails from file
username=config.get("configuration","username")
password=config.get("configuration","password")
cluster_url=config.get("configuration","cluster_url")
bucket_name=config.get("configuration","bucket_name")

from couchbase.cluster import Cluster
from couchbase.cluster import PasswordAuthenticator
cluster = Cluster(cluster_url)
authenticator = PasswordAuthenticator(username,password)
cluster.authenticate(authenticator)
bucket = cluster.open_bucket(bucket_name)

from couchbase.n1ql import N1QLQuery
query = N1QLQuery("""SELECT airportname, city, country FROM `travel-sample` """
                  """WHERE type="airport" AND city=$my_city""", my_city="Reno")
for row in bucket.n1ql_query(query):
    print(row)