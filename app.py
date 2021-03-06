import env

from flask import Flask
from flask import redirect
from flask import render_template
from flask import request

from twitch import Twitch

trueStrings = [">", "y", "Y"]
falseStrings = ["<", "n", "N"]

app = Flask(__name__)

t = Twitch()
t.twitch_connect(env.TWITCH_USERNAME, env.TWITCH_KEY)

@app.route("/")
def getIndex():
	return render_template("index.html")

@app.route("/twitch")
def getTwitch():
	messages = t.twitch_recieve_messages();

	trues, falses = 0, 0

	if messages:
		for message in messages:
			text = message["message"]
			print(message["username"] + ":", text)
			if text in trueStrings:
				trues += 1
			elif text in falseStrings:
				falses += 1

	print("trues:", trues, "\tfalses:", falses)

	return '{"trues": '+str(trues)+',"falses": '+str(falses)+'}'

if __name__ == '__main__':
	app.run(debug=True)
