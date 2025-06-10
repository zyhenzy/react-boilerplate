import React, {useEffect, useState} from 'react';
import type {Agent} from "../api/agent/types";
import {createAgent, enableAgent, getAgentList, updateAgent} from "../api/agent";

const About: React.FC = () => {
    return (
        <div>
            <h1>About Page</h1>
        </div>
    );
};

export default About;
