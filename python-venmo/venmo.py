from venmo_api import Client

# def getAccessToken(username, password):
#     accessToken = Client.get_access_token(username=username,
#                                             password=password)
#     if(accessToken != ""):
#         return accessToken
    

# def searchForUsers(usrname):
#     users = client.user.search_for_users(query = usrname)
#     for user in users:
#         if(users.__len__ < 2):   
#             return user.id
#     return 1000000000000000000


# def requestMoney(name, amt, usrname):
#     client.payment.request_money(amt, name + " - Sidequest", usrname)

# def sendMoney(name, amt, usrname):
#     client.payment.send_money(amt, name + " - Sidequest", usrname)

# def logOut():
#     client.log_out("Bearer " + accessToken)

accessToken = Client.get_access_token(username="4157698863",
                                            password="XianzhiHua050603")
# print(accessToken)
# client = Client(access_token="949c3414a54f24064e2b6829e61596536cb8e21ed3411197edb636aa52e18128")
# searchForUsers("Connor-Browder")
# Client.log_out("Bearer 949c3414a54f24064e2b6829e61596536cb8e21ed3411197edb636aa52e18128")
