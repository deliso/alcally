import React, { useEffect, useState } from 'react';
import { Company } from './../../../../types/types';

type Props = {};
const CompanyPage = (props: Props) => {
  const baseUrl = 'http://localhost:3001/';
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    const getCompanies: () => Promise<void> = async () => {
      const companyData = await fetch(`${baseUrl}company`);
      const jsonCompanyData = await companyData.json();
      setCompanies([...jsonCompanyData]);
    };
    getCompanies();
  }, []);

  return (
    <>
      <div>Select a Company</div>
      <div>
        {companies.map((company) => {
          return <button>{company.name}</button>;
        })}
      </div>
    </>
  );
};

export default CompanyPage;
