import { useContext } from 'react';
import { useApi } from './useAPI';
import { UserContext } from './UserContext';

export const useQuickApi = () => {
  const { caseCreate, caseSubmit, caseReady, caseClaim, caseAddAction } = useApi();
  const { userData } = useContext(UserContext); // Use `useContext` at the top level of the hook

  const quickAction = async (defLogin, defName, title, description, ref,
    actType, actSub, actDetail
  ) => {
    if (!userData) {
      console.error('User data is not available');
      return;
    }

    try {
      // Step 1: Create a case
      let result = await caseCreate(
        title,
        description,
        userData?.player?.login,
        userData?.player?.nickname,
        defLogin,
        defName,
        ref
      );

      if (!result.success) {
        console.error('Create case failed:', result.error || result.status);
        return;
      }

      const rec = result?.data || null;
      if (!rec?.uri) {
        console.error('No selected case or invalid URI');
        return;
      }

      // Step 2: Submit the case
      result = await caseSubmit(rec.uri);
      if (!result.success) {
        console.error('Submit case failed:', result.error || result.status);
        return;
      }

      // Step 3: Claim the case
      result = await caseClaim(rec.uri);
      if (!result.success) {
        console.error('Claim case failed:', result.error || result.status);
        return;
      }

      // Step 4: Add action
      result = await caseAddAction(rec.uri, actType, actSub, actDetail);
      if (!result.success) {
        console.error('add action to case failed:', result.error || result.status);
        return;
      }

      // Step 5: Mark the case ready
      result = await caseReady(rec.uri);
      if (!result.success) {
        console.error('Mark case ready failed:', result.error || result.status);
        return;
      }

    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  const quickChangeName = async (login, oldName) => {
    quickAction(login, oldName, 'Inappropriate Name',
        'Your name does not meet community standards. Please change it to something that does.',
        `PLAYER#${login}`,
        'nickname', 'CHANGE_NAME', 'Name does not meet community standards');
  };

  const quickBePolite = async (login, oldName, ref) => {
    quickAction(login, oldName, 'Inappropriate Language',
        'Your speech does not meet community standards. Please moderate your language.',
        ref,
        'nickname', 'BE_POLITE', 'Speech does not meet community standards');
  };

  const quickPleaseUpgrade = async (login, oldName, ref) => {
    quickAction(login, oldName, 'Upgrade Client',
        'Your client is outdated. Please upgrade to the latest version.',
        ref,
        'nickname', 'PLEASE_UPGRADE', 'Client is outdated');
  };

  return {
    quickChangeName,
    quickBePolite,
    quickPleaseUpgrade
  };
};
