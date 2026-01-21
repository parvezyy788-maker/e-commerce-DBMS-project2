from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, User, Product

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 1. CORS Update: Taake PUT aur DELETE requests block na hon
CORS(app, resources={r"/api/*": {"origins": "*"}})

db.init_app(app)

with app.app_context():
    db.create_all()
    # ... (Aapka existing product seed logic yahan rahega) ...

# --- PRODUCT ROUTES ---

@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{"id": p.id, "name": p.name, "price": p.price, "image": p.image_url, "category": p.category} for p in products])
@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    new_product = Product(name=data['name'], price=data['price'], image_url=data.get('image', 'default.png'), category=data['category'])
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product Added Successfully!"}), 201

# --- NEW: UPDATE PRODUCT (Edit Logic) ---
@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.json
    product = Product.query.get(id)
    
    if not product:
        return jsonify({"message": "Product not found"}), 404
    
    product.name = data.get('name', product.name)
    product.price = data.get('price', product.price)
    product.category = data.get('category', product.category)
    product.image_url = data.get('image', product.image_url)
    
    db.session.commit()
    return jsonify({"message": "Product Updated Successfully!", "success": True})

# --- NEW: DELETE PRODUCT ---
@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get(id)
    if not product:
        return jsonify({"message": "Product not found"}), 404
    
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product Deleted Successfully!", "success": True})


# --- AUTH ROUTES ---

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"message": "Email already exists!", "success": False}), 400
    
    new_user = User(username=data['username'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User Registered Successfully!", "success": True}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email, password=password).first()
    
    if user:
        return jsonify({"message": "Login successful!", "success": True, "username": user.username}), 200
    else:
        return jsonify({"message": "Invalid email or password", "success": False}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000)