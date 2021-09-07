from flask import Flask
from flask_cors import CORS
from flask import request
import re
from data import data
import random
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route("/")
def hello_world():
    
    page = request.args.get('page', default = "x", type = str)
    print(page)
    inp = page
    items_count = 0
    temp_list = []
    addition = 0
    def compare_lists(list1, list2):
        count = 0
        for item in list1:
            item1_to_lower = item.lower()
            for item2 in list2:
                item2_to_lower = item2.lower()
                if(item1_to_lower == item2_to_lower):
                    count += 1 
        return count

    def remove_stop_word(sentence):                             # functioni to remove stop words
        example_sent = sentence
        stop_words = set(stopwords.words('english'))
        
        word_tokens = word_tokenize(example_sent)
        
        filtered_sentence = [w for w in word_tokens if not w.lower() in stop_words]
        
        filtered_sentence = []
        
        for w in word_tokens:
            if w not in stop_words:
                filtered_sentence.append(w)
        return filtered_sentence


    input_list = remove_stop_word(inp)                          # seperating input sentence 

    for i in data:
        items_count += 1
        for items in i["patterns"]:
            items_sep = remove_stop_word(items)
            match_count = compare_lists(input_list, items_sep)  #give the number of word matcing
            addition = addition + match_count                   #add matching number to the addition
        if(len(input_list) == 0):
            return "i dont understand what you say"
        else:
            percentage = (addition/len(input_list))*100             #addition is divided by total number of words in input list to calculate percentage
            temp_list.append(percentage)                            #append this percentage to a temparary list 
            addition = 0                                            #clear the addition for next pattern



    

    max_number = max(temp_list)
    print(temp_list)
    
    if(max_number > 40):                                        #if comparing result is higher than 40%
        index = temp_list.index(max_number)                     
        print(data[index]["responses"])
        string = random.choice(data[index]["responses"])
    else:
        string = "i dont understand what you say"
   
    return string