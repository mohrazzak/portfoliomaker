// import { MultiLangFieldDto } from 'src/modules/translate/schemas';
// import { Prisma } from '@prisma/client';

// export function getMultiLangFieldUpdateObject(
//   textContent: MultiLangFieldDto | undefined | null,
// ):
//   | Prisma.TextContentUpdateOneRequiredWithoutNameForStoreNestedInput
//   | undefined {
//   return textContent
//     ? {
//         update: {
//           ...textContent,
//           translations: {
//             upsert: textContent.translations.map((t: any) => ({
//               create: { ...t },
//               update: { ...t },
//               where: {
//                 textContentId_languageId: {
//                   languageId: t.languageId,
//                   textContentId: textContent.id,
//                 },
//                 id: t.id,
//               },
//             })),
//           },
//         },
//       }
//     : undefined;
// }
// export function getMultiLangFieldUpdateOptionalObject(
//   textContent: MultiLangFieldDto | undefined | null,
// ): Prisma.TextContentUpdateOneWithoutSloganForStoreNestedInput | undefined {
//   return textContent
//     ? {
//         update: {
//           ...textContent,
//           translations: {
//             upsert: textContent.translations.map((t: any) => ({
//               create: { ...t },
//               update: { ...t },
//               where: {
//                 textContentId_languageId: {
//                   languageId: t.languageId,
//                   textContentId: textContent.id,
//                 },
//                 id: t.id,
//               },
//             })),
//           },
//         },
//       }
//     : textContent === null
//     ? { disconnect: true }
//     : undefined;
// }
