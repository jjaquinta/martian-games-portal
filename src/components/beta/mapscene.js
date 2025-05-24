import React from 'react';
import { useApi } from '../useAPI';

const MapScene = ({ rec }) => {
    const { selectMap } = useApi();
  
    const doBack = async () => {
        await selectMap(null);
      };

      return (
    <>
        <div className="form-container">
            <button type="button" className="refresh-button" onClick={doBack}>
                Back
            </button>
        </div>
        <table>
        <tbody>
            <tr>
            <th>Created</th>
            <td>{rec.createdTime}</td>
            </tr>
            <tr>
            <th>Updated</th>
            <td>{rec.updatedTime}</td>
            </tr>
            <tr>
            <th>Login</th>
            <td>{rec.login}</td>
            </tr>
            <tr>
            <th>Nickname</th>
            <td>{rec.nickname}</td>
            </tr>
            <tr>
            <th>Public</th>
            <td>{rec.pub}</td>
            </tr>
            <tr>
            <th>Name</th>
            <td>{rec.name}</td>
            </tr>
            <tr>
            <th colSpan="2">Description</th>
            </tr>
            <tr>
            <td colSpan="2">{rec.description}</td>
            </tr>
        </tbody>
        </table>
    </>
  );
};

export default MapScene;
