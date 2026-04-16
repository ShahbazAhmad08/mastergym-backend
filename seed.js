const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Member = require('./models/Member');
const Trainer = require('./models/Trainer');
const Membership = require('./models/Membership');
const Service = require('./models/Service');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await User.deleteMany();
    await Member.deleteMany();
    await Trainer.deleteMany();
    await Membership.deleteMany();
    await Service.deleteMany();

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@mastergym.com',
      password: 'admin123',
      role: 'admin'
    });

    // Create memberships
    await Membership.insertMany([
      {
        name: 'Basic',
        price: 29,
        duration: 'month',
        description: 'Perfect for beginners starting their fitness journey',
        features: ['Access to gym floor', 'Cardio equipment', 'Weight training area', 'Locker room access', 'Free Wi-Fi', 'Operating hours access'],
        highlighted: false
      },
      {
        name: 'Premium',
        price: 59,
        duration: 'month',
        description: 'Most popular choice for serious fitness enthusiasts',
        features: ['All Basic features', 'Group fitness classes', '2 personal training sessions/month', 'Nutrition consultation', 'Sauna & steam room', 'Extended hours access', 'Guest passes (2/month)'],
        highlighted: true
      },
      {
        name: 'Elite',
        price: 99,
        duration: 'month',
        description: 'Ultimate fitness experience with unlimited access',
        features: ['All Premium features', 'Unlimited personal training', 'Custom workout plans', 'Monthly body composition analysis', 'Priority class booking', '24/7 gym access', 'Unlimited guest passes', 'Exclusive member events', 'Free parking'],
        highlighted: false
      }
    ]);

    // Create trainers
    const trainers = await Trainer.insertMany([
      {
        name: 'John Smith',
        email: 'john@mastergym.com',
        phone: '+1-555-0101',
        specialty: 'Strength Training',
        experience: 10,
        certifications: ['NASM-CPT', 'CSCS'],
        bio: 'Certified strength and conditioning specialist with 10+ years of experience.',
        rating: 4.9,
        totalReviews: 127
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@mastergym.com',
        phone: '+1-555-0102',
        specialty: 'Yoga & Meditation',
        experience: 8,
        certifications: ['RYT-500', 'NASM-CPT'],
        bio: 'Expert yoga instructor specializing in mindfulness and flexibility training.',
        rating: 4.8,
        totalReviews: 98
      },
      {
        name: 'Mike Davis',
        email: 'mike@mastergym.com',
        phone: '+1-555-0103',
        specialty: 'HIIT & Cardio',
        experience: 6,
        certifications: ['ACE-CPT', 'HIIT Certified'],
        bio: 'High-intensity training expert focused on cardiovascular fitness.',
        rating: 4.7,
        totalReviews: 85
      }
    ]);

    // Create members
    await Member.insertMany([
      {
        name: 'David Wilson',
        email: 'david@email.com',
        phone: '+1-555-0201',
        membershipPlan: 'Premium',
        expiryDate: new Date('2026-05-15'),
        status: 'Active',
        assignedTrainer: trainers[0]._id
      },
      {
        name: 'Emily Brown',
        email: 'emily@email.com',
        phone: '+1-555-0202',
        membershipPlan: 'Elite',
        expiryDate: new Date('2026-06-20'),
        status: 'Active',
        assignedTrainer: trainers[1]._id
      },
      {
        name: 'James Taylor',
        email: 'james@email.com',
        phone: '+1-555-0203',
        membershipPlan: 'Basic',
        expiryDate: new Date('2026-04-30'),
        status: 'Active'
      }
    ]);

    // Create services
    await Service.insertMany([
      {
        title: 'Personal Training',
        description: 'One-on-one sessions with certified trainers',
        icon: '💪',
        category: 'Training',
        features: ['Customized workout plans', 'Nutritional guidance', 'Progress tracking', 'Flexible scheduling']
      },
      {
        title: 'Group Fitness Classes',
        description: 'Energizing group classes for all fitness levels',
        icon: '👥',
        category: 'Classes',
        features: ['50+ weekly classes', 'All fitness levels', 'Expert instructors', 'Motivating atmosphere']
      },
      {
        title: 'Nutrition Coaching',
        description: 'Professional nutritionists help you develop healthy eating habits',
        icon: '🥗',
        category: 'Coaching',
        features: ['Personalized meal plans', 'Dietary assessments', 'Supplement guidance', 'Lifestyle coaching']
      }
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('\n📧 Admin Login:');
    console.log('Email: admin@mastergym.com');
    console.log('Password: admin123');
    console.log('\n📊 Sample Data Created:');
    console.log('- 1 Admin User');
    console.log('- 3 Membership Plans');
    console.log('- 3 Trainers');
    console.log('- 3 Members');
    console.log('- 3 Services');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
