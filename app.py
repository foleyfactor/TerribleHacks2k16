from flask import Flask
from flask import redirect
from flask import render_template
from flask import request

import os
import requests


app = Flask(__name__)

# ENV_VAR = os.environ["ENV_VAR"]

@app.route("/")
def getIndex():
	return render_template("index.html")

if __name__ == '__main__':
	app.run(debug=True)