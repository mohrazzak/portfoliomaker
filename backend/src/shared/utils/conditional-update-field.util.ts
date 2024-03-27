// import { MultiLangFieldDto } from 'src/modules/translate/schemas';

// export function createConditionalUpdateField(
//   data: MultiLangFieldDto | undefined | null,
// ) {
//   if (!data) return undefined;

//   const { id, ...rest } = data;

//   return id
//     ? {
//         update: {
//           data: {
//             ...rest,
//             translations: { set: data.translations },
//           },
//           where: { id },
//         },
//       }
//     : undefined;
// }
