import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required()
          .min(10),
        email: Yup.string()
          .email()
          .required(),
        idade: Yup.number()
          .required()
          .integer()
          .positive()
          .moreThan(10)
          .lessThan(120),
        peso: Yup.number()
          .required()
          .positive()
          .moreThan(25)
          .lessThan(500),
        altura: Yup.number()
          .required()
          .integer()
          .positive()
          .moreThan(50)
          .lessThan(260)
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const studentExists = await Student.findOne({
        where: { email: req.body.email }
      });

      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists.' });
      }

      const student = await Student.create(req.body);

      return res.json(student);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().min(10),
        oldEmail: Yup.string().email(),
        email: Yup.string()
          .email()
          .required(),
        idade: Yup.number()
          .integer()
          .positive()
          .moreThan(10)
          .lessThan(120),
        peso: Yup.number()
          .positive()
          .moreThan(25)
          .lessThan(500),
        altura: Yup.number()
          .integer()
          .positive()
          .moreThan(50)
          .lessThan(260)
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails' });
      }

      const { oldEmail, email } = req.body;

      const student = await Student.findOne({
        where: { email: oldEmail || email }
      });

      if (!student) {
        return res
          .status(400)
          .json({ error: `Student: ${oldEmail || email} does not exists.` });
      }

      if (email !== student.email) {
        const studentExists = await Student.findOne({
          where: { email: req.body.email }
        });

        if (studentExists) {
          return res
            .status(400)
            .json({ error: `Student: ${email} already exists.` });
        }
      }

      const studentNew = await student.update(req.body);

      return res.json(studentNew);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new StudentController();
