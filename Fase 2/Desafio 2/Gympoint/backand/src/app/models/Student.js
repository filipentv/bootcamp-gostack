import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        idade: Sequelize.INTEGER,
        peso: Sequelize.DECIMAL(14, 3),
        altura: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );
  }
}

export default Student;
