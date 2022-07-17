import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as api from '../../lib/api/api';
import {
  qs_scrapeReview,
  qs_scrapeCheck,
  qs_codebook,
} from '../../lib/api/query';
import ScrapeListTable from '../../components/scrape/ScrapeListTable';
import ScrapeSubMenu from '../../components/scrape/ScrapeSubMenu';
import {
  columns_review,
  columns_check,
} from '../../components/scrape/formData';

const Base = styled.div`
  width: 100%;
`;

const ScrapeListContainer = () => {
  const [mode, setMode] = useState('review');
  const [scrape, setScrape] = useState('');
  const [codebook, setCodebook] = useState();

  useEffect(() => {
    let rev_1st;
    api
      .getQueryString('api/codebooks', qs_codebook('sc-rev_1st'))
      .then((rev1) => {
        console.log('**codebook1**', rev1.data);
        rev_1st = rev1.data.data;
        api.getQueryString('api/codebooks', qs_codebook('sc-rev_2nd'));
      })
      .then((rev2) => {
        console.log('**codebook2**', rev2);
        // const rev_2nd = rev2.data.data;
        // setCodebook(rev_1st, rev_2nd);
      })
      .catch((err) => {
        console.error('**error**', err);
      });
  }, []);

  useEffect(() => {
    //
    const path = mode === 'review' ? 'api/scrape-reviews' : 'api/scrapes';
    const query = mode === 'review' ? qs_scrapeReview() : qs_scrapeCheck();
    api
      .getQueryString(path, query)
      .then((result) => {
        console.log('**result**', result.data);
        setScrape(result.data.data);
      })
      .catch((err) => {
        console.error('**error**', err);
      });
  }, [mode]);

  const changeMode = (nextmode) => {
    if (mode === nextmode) return;
    setMode(nextmode);
    setScrape();
  };

  const dataSource = () => {
    if (!scrape) return;
    console.log('**scrape**', scrape);
    if (mode === 'review') {
      const result = scrape.map((list, index) => {
        const sdata = list.attributes;
        const _review_result = sdata.review_result.data
          ? sdata.review_result.data.attributes.name
          : null;
        const _attachment = sdata.attachment.data
          ? sdata.attachment.data[0].attributes
          : '';
        const returnData = {
          key: list.id,
          type_orgcode: sdata.type_orgname.data.attributes.code,
          type_orgname: sdata.type_orgname.data.attributes.name,
          title: sdata.title,
          review_date: sdata.review_date,
          review_opnion: sdata.review_opnion,
          type_input: sdata.type_input.data.attributes.name,
          review_result: _review_result,
          attachment_name: _attachment ? _attachment.name : '',
          description: 'test',
        };
        return returnData;
      });
      return result;
    }

    // scrape
    if (mode === 'scrape') {
      const result = scrape.map((list, index) => {
        const sdata = list.attributes;
        const _check_result = sdata.check_result.data
          ? sdata.check_result.data.attributes.name
          : null;
        const returnData = {
          key: list.id,
          org_no: sdata.org_no,
          type_orgcode: sdata.type_orgname.data.attributes.code,
          type_orgname: sdata.type_orgname.data.attributes.name,
          title: sdata.title,
          check_date: sdata.review_date,
          check_result: _check_result,
          description: 'test',
        };
        return returnData;
      });
      return result;
    }
  };
  console.log('>>>>>>>>', dataSource());

  return (
    <Base>
      <ScrapeSubMenu changeMode={changeMode} />
      {mode === 'review' ? (
        <ScrapeListTable
          codebook={codebook}
          columns={columns_review}
          dataSource={dataSource()}
        />
      ) : (
        <ScrapeListTable
          codebook={codebook}
          columns={columns_check}
          dataSource={dataSource()}
        />
      )}
    </Base>
  );
};

export default ScrapeListContainer;
