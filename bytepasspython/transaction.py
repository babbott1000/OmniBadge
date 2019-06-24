"""
on the server side the verifcation should look somthing like this
def verify_signature(data, signature):
    return signature == create_signature(data)
"""

import requests
import hashlib
import json
class data:
    firstName = ""
    lastName = ""
    grade = 0
    classRoomNum = 0
    teacherFirstName = ""
    teacherLastName = ""
    time = ""
    date = ""
    shared_private_key = "asdAIiorbOpaWenUHQEeqwJB"

    def __init__(self, fn, ln, g, crn, tfn, tln, t, d):
        self.firstName = fn
        self.lastName = ln
        self.grade = g
        self.classRoomNum = g
        self.teacherFirstName = tfn
        self.teacherLastName = tln
        self.time = t
        self.date = d
    #returns a json of all the data about the new pass into a json format so that it can be hashed -includes the key
    def toJson(self):
        str = ({'firstName': self.firstName,
            'lastName' : self.lastName,
            'grade' : self.grade,
            'classRoomNum' : self.classRoomNum,
            'teacherFirstName' : self.teacherFirstName,
            'teacherLastName' :  self.teacherLastName,
            'time':  self.time,
            'date': self.date,
            'key' : self.shared_private_key})
        str = json.dumps(str)
        return (str)

    #returns the shared key
    def returnKey(self):
        return (self.shared_private_key)


#create a data object with all of the information about the person. this should be "stored" on the persons card
newPass = data("jack", "Baude", 10, 0, "nick", "springer","some time string", "date")

#this is the key we will be using - may be changed i just smashed my keybaord
shared_private_key = newPass.returnKey()

#this function hashes the json of the persons data with the key into 32 chars
def create_signature():
    return (hashlib.sha1((newPass.toJson()).encode('utf-8')).hexdigest())
print(create_signature())

#the URL we are posting to
url = "https://bytepassedu.com/newpass"
#this is the body json of the POST
body = newPass.toJson()
#this is the header that we are sending - it is the hash so it can be checked in the server
hashJson = {"x-signature": create_signature()}
# posting to the URL with the hash as the header and the body is all the data about the person
r = requests.post(url, data=body, headers = hashJson)
