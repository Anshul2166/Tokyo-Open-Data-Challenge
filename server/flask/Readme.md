**Virtual env setup**

First, we need to setup a virtual environment, which is the recommended practice in such scenarios. This helps ensure that all are working in same versions and have no conflicts.
Following are the steps to setup virtual env:-

1) Use the following command to install virtual env:-
    ```pip install virtualenv```

2) After installation, use the following command to setup a virtual environment:-
    ```virtualenv venv```

3) On windows, copy the *absolute* path of the activate.bat inside venv/scripts and then paste it in the command line.

4) For linux or macOS, use the following command
    ```source venv/bin/activate```

5) The virtual env is now up and running.

6) To leave the virtual environment, use
    ```deactivate```

**Flask setup**

1) Ensure the virtual environment is working.

2) If working, use the following command in the command prompt(on windows)
    ```set FLASK_APP=index.py``` 

3) If working on linux/macOS, then execute the following command in terminal
    ```export FLASK_APP=index.py```

4) After this, execute the following command
    ```python -m flask run```

5) Now head over to http://localhost:5000/, and you should see your app running. 

**Couchbase**

For installation, refer to couchbase official installation instructions. Download the couchbase enterprise server from [here](https://www.couchbase.com/downloads)