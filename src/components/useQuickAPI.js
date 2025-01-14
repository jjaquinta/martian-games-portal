import { useContext } from 'react';
import { useApi } from './useAPI';
import { UserContext } from './UserContext';

export const useQuickApi = () => {
  const { caseCreate, caseSubmit, caseReady, caseClaim, caseAddAction } = useApi();
  const { userData } = useContext(UserContext); // Use `useContext` at the top level of the hook

  const quickChangeName = async (login, oldName) => {
    if (!userData) {
      console.error('User data is not available');
      return;
    }

    alert(`Change name for '${login}' from '${oldName}'`);

    try {
      // Step 1: Create a case
      let result = await caseCreate(
        'Change Your Name',
        'Your name does not meet community standards. Please change it to something that does.',
        userData?.player?.login,
        userData?.player?.nickname,
        login,
        oldName,
        `PLAYER#${login}`
      );

      if (!result.success) {
        console.error('Create case failed:', result.error || result.status);
        return;
      }
      console.log(result?.data);

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
      result = await caseAddAction(rec.uri, 'nickname', 'CHANGE_NAME', 'Name does not meet community standards');
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

  return {
    quickChangeName,
  };
};
