from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:admin123@database-1.cslawiqjy7my.ap-south-1.rds.amazonaws.com/myHotel'
db = SQLAlchemy(app)

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    adults = db.Column(db.Integer)
    kids = db.Column(db.Integer)
    check_in = db.Column(db.DateTime)
    check_out = db.Column(db.DateTime)
    room_type = db.Column(db.String(50))
    price = db.Column(db.Float)
    booked = db.Column(db.Boolean, default=False)

@app.route('/book_room', methods=['POST'])
def book_room():
    data = request.json
    new_booking = Booking(
        name=data['name'],
        email=data['email'],
        adults=data['adults'],
        kids=data['kids'],
        check_in=datetime.fromisoformat(data['check_in']),
        check_out=datetime.fromisoformat(data['check_out']),
        room_type=data['room_type'],
        price=data['price']
    )
    db.session.add(new_booking)
    db.session.commit()
    return jsonify({'message': 'Room booked successfully', 'price': data['price']})

if __name__ == '__main__':
    app.run(debug=True)
