# populate_db.py
from app import create_app, db
from app.models import User, Item, Image, Auction, Bid, BidHistory, Report, AuditLog, Notification
from datetime import datetime, timedelta

app = create_app()
app.app_context().push()

# Clear existing data (optional, for testing purposes)
db.drop_all()
db.create_all()

# Create sample users
user1 = User(username="auctioneer1", password_hash="hashed_password1", email="auctioneer1@example.com", role="auctioneer")
user2 = User(username="bidder1", password_hash="hashed_password2", email="bidder1@example.com", role="bidder")

# Add users to session
db.session.add(user1)
db.session.add(user2)

# Create sample items
item1 = Item(title="Antique Vase", description="An exquisite antique vase from the 19th century.", starting_price=100.0, category="Antiques", posted_by=1)
item2 = Item(title="Vintage Clock", description="A beautiful vintage clock with intricate details.", starting_price=200.0, category="Clocks", posted_by=1)

# Add items to session
db.session.add(item1)
db.session.add(item2)

# Create sample images for items
image1 = Image(image_url="vase1.jpg", item_id=1)
image2 = Image(image_url="vase2.jpg", item_id=1)
image3 = Image(image_url="clock1.jpg", item_id=2)

# Add images to session
db.session.add(image1)
db.session.add(image2)
db.session.add(image3)

# Create sample auctions
auction1 = Auction(item_id=1, start_time=datetime.utcnow(), end_time=datetime.utcnow() + timedelta(days=2), status="active")
auction2 = Auction(item_id=2, start_time=datetime.utcnow(), end_time=datetime.utcnow() + timedelta(days=3), status="active")

# Add auctions to session
db.session.add(auction1)
db.session.add(auction2)

# Create sample bids for auctions
bid1 = Bid(amount=120.0, bidder_id=2, auction_id=1)
bid2 = Bid(amount=130.0, bidder_id=2, auction_id=1)
bid3 = Bid(amount=210.0, bidder_id=2, auction_id=2)

# Add bids to session
db.session.add(bid1)
db.session.add(bid2)
db.session.add(bid3)

# Create bid history records
bid_history1 = BidHistory(bid_id=1, auction_id=1, timestamp=datetime.utcnow())
bid_history2 = BidHistory(bid_id=2, auction_id=1, timestamp=datetime.utcnow())
bid_history3 = BidHistory(bid_id=3, auction_id=2, timestamp=datetime.utcnow())

# Add bid histories to session
db.session.add(bid_history1)
db.session.add(bid_history2)
db.session.add(bid_history3)

# Create sample reports
report1 = Report(report_type="Fraud", details="Reported for suspicious bidding activity.", status="open", generated_by=2)
report2 = Report(report_type="Item Quality", details="Item description does not match reality.", status="closed", generated_by=2)

# Add reports to session
db.session.add(report1)
db.session.add(report2)

# Create sample audit logs
audit_log1 = AuditLog(action="Created auction for item 1", user_id=1)
audit_log2 = AuditLog(action="Placed bid of $130 on auction 1", user_id=2)

# Add audit logs to session
db.session.add(audit_log1)
db.session.add(audit_log2)

# Create sample notifications
notification1 = Notification(message="Your bid of $130 has been accepted.", user_id=2)
notification2 = Notification(message="The auction for Vintage Clock ends soon.", user_id=2)

# Add notifications to session
db.session.add(notification1)
db.session.add(notification2)

# Commit all changes to the database
db.session.commit()

print("Sample data added successfully.")
