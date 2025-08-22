import React, { useState } from 'react';
import { useApi } from '../useAPI';

const MapScene = ({ rec }) => {
    const { selectMap, saveMap } = useApi();
  
    const [name, setName] = useState(rec.name);
    const [description, setDescription] = useState(rec.description);
    const [pub, setPub] = useState(rec.pub);

    const doCancel = async () => {
        await selectMap(null);
      };

      const doSave = async () => {
        const updatedRec = { ...rec, name, description, pub };
        await saveMap(updatedRec);
    };

      return (
    <>
        <div className="form-container">
            <button type="button" className="refresh-button" onClick={doCancel}>
                Cancel
            </button>
            <button type="button" className="refresh-button" onClick={doSave}>
                Save
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
            <td>
                <input
                    type="checkbox"
                    checked={pub}
                    onChange={(e) => setPub(e.target.checked)}
                />
            </td>
            </tr>
            <tr>
                <th>Name</th>
                <td>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                    />
                </td>
            </tr>
            <tr>
                <th colSpan="2">Description</th>
            </tr>
            <tr>
                <td colSpan="2">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field"
                        rows={4}
                    />
                </td>
            </tr>
        </tbody>
        </table>
    </>
  );
};

export default MapScene;
