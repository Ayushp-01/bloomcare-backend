const express = require('express');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Store checklist state in memory per user (in production, use a DB model)
// For now we use a simple in-memory store; frontend uses localStorage for persistence
// GET /api/checklist
router.get('/', protect, (req, res) => {
  res.json({
    pregnancy: [
      { id: 'p1', trimester: 1, task: 'Book first prenatal appointment', category: 'Medical' },
      { id: 'p2', trimester: 1, task: 'Start prenatal vitamins (folic acid)', category: 'Medical' },
      { id: 'p3', trimester: 1, task: 'Get blood tests done', category: 'Medical' },
      { id: 'p4', trimester: 1, task: 'Calculate due date', category: 'Planning' },
      { id: 'p5', trimester: 1, task: 'Inform close family members', category: 'Personal' },
      { id: 'p6', trimester: 2, task: 'Schedule NT scan (11-13 weeks)', category: 'Medical' },
      { id: 'p7', trimester: 2, task: 'Anomaly scan (18-20 weeks)', category: 'Medical' },
      { id: 'p8', trimester: 2, task: 'Start maternity clothes shopping', category: 'Shopping' },
      { id: 'p9', trimester: 2, task: 'Register for antenatal classes', category: 'Education' },
      { id: 'p10', trimester: 2, task: 'Discuss birth plan with doctor', category: 'Medical' },
      { id: 'p11', trimester: 3, task: 'Tour hospital/birth center', category: 'Planning' },
      { id: 'p12', trimester: 3, task: 'Install car seat', category: 'Baby' },
      { id: 'p13', trimester: 3, task: 'Pack hospital bag', category: 'Planning' },
      { id: 'p14', trimester: 3, task: 'Prepare baby nursery', category: 'Baby' },
      { id: 'p15', trimester: 3, task: 'Discuss maternity leave with employer', category: 'Personal' },
    ],
    hospitalBag: [
      { id: 'h1', category: 'Documents', item: 'ID / Aadhar card' },
      { id: 'h2', category: 'Documents', item: 'Hospital registration documents' },
      { id: 'h3', category: 'Documents', item: 'Insurance cards' },
      { id: 'h4', category: 'Documents', item: 'Birth plan copy' },
      { id: 'h5', category: 'Mother Essentials', item: 'Comfortable nightgown / hospital gown' },
      { id: 'h6', category: 'Mother Essentials', item: 'Slippers / non-slip socks' },
      { id: 'h7', category: 'Mother Essentials', item: 'Toiletries & personal care items' },
      { id: 'h8', category: 'Mother Essentials', item: 'Nursing bra & breast pads' },
      { id: 'h9', category: 'Mother Essentials', item: 'Sanitary pads (maternity)' },
      { id: 'h10', category: 'Baby Essentials', item: 'Onesies & bodysuits (3-5 sets)' },
      { id: 'h11', category: 'Baby Essentials', item: 'Baby blanket / swaddle' },
      { id: 'h12', category: 'Baby Essentials', item: 'Diapers & wipes' },
      { id: 'h13', category: 'Baby Essentials', item: 'Baby cap & mittens' },
      { id: 'h14', category: 'For Partner', item: 'Change of clothes (2 days)' },
      { id: 'h15', category: 'For Partner', item: 'Snacks & water bottle' },
      { id: 'h16', category: 'Electronics', item: 'Phone charger & power bank' },
      { id: 'h17', category: 'Electronics', item: 'Camera / extra SD card' },
      { id: 'h18', category: 'Medications', item: 'Prescribed medications list' },
    ]
  });
});

module.exports = router;
