const bcrypt = require("bcrypt");
const connection = require("../config/db"); // Asegúrate de que la ruta sea correcta

async function hashPasswords() {
  try {
    // Obtener todos los usuarios
    connection.query("SELECT id, password FROM users", async (err, users) => {
      if (err) {
        console.error("❌ Error al obtener usuarios:", err);
        return;
      }

      for (const user of users) {
        // Si la contraseña no está hasheada, la encriptamos
        if (!user.password.startsWith("$2b$")) {
          const hashedPassword = await bcrypt.hash(user.password, 10);

          // Actualizar la contraseña en la base de datos
          connection.query(
            "UPDATE users SET password = ? WHERE id = ?",
            [hashedPassword, user.id],
            (err) => {
              if (err) {
                console.error(
                  `❌ Error al actualizar usuario ${user.id}:`,
                  err
                );
              } else {
                console.log(`✅ Contraseña de usuario ${user.id} actualizada.`);
              }
            }
          );
        }
      }

      console.log("🚀 Todas las contraseñas han sido hasheadas correctamente.");
      connection.end(); // Cerrar conexión
    });
  } catch (error) {
    console.error("❌ Error al hashear las contraseñas:", error);
    connection.end();
  }
}

// Ejecutar el script
hashPasswords();
