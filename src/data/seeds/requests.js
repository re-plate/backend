exports.seed = knex => knex('requests')
  .del()
  .then(() => knex('requests').insert([
    {
      id: 1,
      name: 'My Donation',
      food_type: 'Beverage',
      pickup_date: '2019-02-32',
      pickup_time: '09:00',
      comment: '',
      instruction: 'Call 021-212321 before coming',
      user_id: 1,
    },
  ]));
