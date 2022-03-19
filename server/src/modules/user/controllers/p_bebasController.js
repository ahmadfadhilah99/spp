const p_bebas = require("../models/p_bebas");

module.exports = {
  getP_bebas: (req, res) => {
    p_bebas.getP_bebas(req.con, res, req.params.siswa_id, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  getDetail: (req, res) => {
    p_bebas.getDetail(req.con, res, req.params.siswa_id, (err, rows) => {
      if (err) throw err;
      if (rows.length == 0)
        return res.json({ error: true, message: "bebas_id tidak ditemukan" });
        const days = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
          ];
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Ags",
            "Sep",
            "Okt",
            "Nov",
            "Des",
          ];
          
          let data = []
          rows.forEach((element, index) => {
              let d = new Date(rows[index].d_bebas_tanggal.toString());
              data.push({
                d_bebas_id: rows[index].d_bebas_id,
                no_transaksi: rows[index].no_transaksi,
                bebas_id: rows[index].bebas_id,
                d_bebas_bayar: rows[index].d_bebas_bayar,
                d_bebas_deskripsi: rows[index].d_bebas_deskripsi,
                d_bebas_tanggal: days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear(),
                admin_id: rows[index].admin_id,
              })
          });
      res.json(data)
    });
  },
};
