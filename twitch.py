import socket
import sys
import re

class Twitch:

    user = ""
    oauth = ""
    s = None

    def twitch_login_status(self, data):
        if not re.match(r'^:(testserver\.local|tmi\.twitch\.tv) NOTICE \* :Login unsuccessful\r\n$', data): return True
        else: return False

    def twitch_connect(self, user, key):
        self.user = user
        self.oauth= key
        print("Connecting to twitch.tv")
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.6)
        connect_host = "irc.twitch.tv"
        connect_port = 6667
        try:
            s.connect((connect_host, connect_port))
        except:
            print("Failed to connect to twitch")
            sys.exit()
        print("Connected to twitch")
        print("Sending our details to twitch...")
        s.send(('USER %s\r\n' % user).encode('utf-8'))
        s.send(('PASS %s\r\n' % key).encode('utf-8'))
        s.send(('NICK %s\r\n' % user).encode('utf-8'))

        if not self.twitch_login_status(s.recv(1024).decode("utf-8") ):
            print("... and they didn't accept our details")
            sys.exit()
        else:
            print("... they accepted our details")
            print("Connected to twitch.tv!")
            self.s = s
            s.send(('JOIN #%s\r\n' % user).encode('utf-8'))
            s.recv(1024)

    # def check_has_message(self, data):
    #     r = re.match(r'^:\w+\!\w+@\w+(\.tmi\.twitch\.tv|\.testserver\.local) PRIVMSG #\w+ :.+$', data)
    #     print(r)
    #     return r

    def parse_message(self, data):
        r = re.match(r'^:(\w+)\!\w+@\w+(?:\.tmi\.twitch\.tv|\.testserver\.local) PRIVMSG (#\w+) :(.+)$', data)
        if r:
            return {
                "channel": r.group(2),
                "username": r.group(1),
                "message": r.group(3)
            }
        else:
            print("No match for:", data)

    def twitch_recieve_messages(self, amount=1024):
        data = None
        try: data = self.s.recv(1024).decode("utf-8") 
        except: return False

        if not data:
            print("Lost connection to Twitch, attempting to reconnect...")
            self.twitch_connect(self.user, self.oauth)
            return None

        #self.ping(data)

        print("DATA")
        print("----")
        print(data)
        print("----")


        return [self.parse_message(line) for line in data.split('\r\n') if line]
