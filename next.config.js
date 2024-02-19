// module.exports = {
//   webpack: (config, { isServer }) => {
//     // Sadece sunucu taraflı işlemleri değiştirin
//     if (isServer) {
//       const originalEntry = config.entry;
//       config.entry = async () => {
//         const entries = await originalEntry();

//         // Güncellenmiş girişler
//         if (
//           entries["main.js"] &&
//           !entries["main.js"].includes("./src/pages/app")
//         ) {
//           entries["main.js"].unshift("./src/pages/app");
//         }

//         return entries;
//       };
//     }

//     return config;
//   },
// };
