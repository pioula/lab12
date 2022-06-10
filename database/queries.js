import { Op } from 'sequelize';

export const get_all_wycieczki = async (db, t=null) => {
    return await db.Wycieczka.findAll({
      where: {
          data_poczatku: {
            [Op.gt]: new Date(Date.now())
          }
        },
      order: ['data_poczatku'], transaction: t
      });
  };

export const get_wycieczka = async (db, id, t=null) => {
    return await db.Wycieczka.findByPk(id, {
    include: [{
        model: db.Zgloszenie
    }], transaction: t})
};