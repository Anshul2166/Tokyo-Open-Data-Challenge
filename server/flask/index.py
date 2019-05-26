from flask import Flask, redirect, url_for,jsonify
from routes.users import index_blueprint
import event_search
from flask_script import Manager
import configparser

app = Flask(__name__)
manager = Manager(app)

# def get_keys():
#    config = configparser.ConfigParser()
#    config.read("./config/keys.txt")
#    eventful_api_key==config.get("configuration","eventful_api_key")
#    return eventful_api_key

@app.route('/flask')
def hello_flask():
   return 'Hello Flask'

@app.route('/python/')
def hello_python():
   return 'Hello Python'

@app.route('/admin')
def hello_admin():
   return 'Hello Admin'

@app.route('/guest/<guest>')
def hello_guest(guest):
   return 'Hello %s as Guest' % guest

@app.route('/get-event')
def get_event():
   # eventful_api_key=get_keys()
   # print(eventful_api_key)
   config = configparser.ConfigParser()
   config.read("./config/keys.txt")
   eventful_api_key=config.get("configuration","eventful_api_key")
   print(eventful_api_key)
   res=event_search.main('tokyo','20190601','20190630',eventful_api_key);
   print(res)
   return jsonify(res)

app.register_blueprint(index_blueprint)

if __name__ == '__main__':
	manager.run()