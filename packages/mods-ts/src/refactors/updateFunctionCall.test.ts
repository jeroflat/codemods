// @ts-ignore
import { applyTransform } from 'jscodeshift/dist/testUtils';
import { format } from '@codemods/mods-utils';

/**
 * @link https://github.com/facebook/jscodeshift/blob/main/README.md#es-modules
 */
import * as updateFunctionCall from './updateFunctionCall';

const transformOptions = {};

describe('update function call', () => {
  it("replaces properly method's new api call", () => {
    const source = `
    import fetch from '@/api/fetch';
    import some from 'some-other-fetch-library';

    some.get('http://yourmom.com');

    some.put('http://madafaka.com', {name: 'user name'});

    fetch.get('http://site.com');

    fetch.put('http://site1.com', null, {foo: 'bar'});

    fetch.put('http://site2.com', null, {foo: 'bar'}, 200);

    fetch.put('http://site3.com', null, null, 200);

    fetch.put('http://site4.com', {id: '123'}, {foo: 'bar'}, 200);

    fetch.put('http://site5.com', {id: '123'}, {foo: 'bar'}, null);

    fetch.put('http://site6.com', {id: '123'}, {foo: 'bar'});

    fetch.put('http://site7.com', {id: '123'}, null);

    fetch.put('http://site8.com', {id: '123'});

    fetch.getBlob('http://url-with-blob.com', null, null, 1000);

    fetch.postAndReceiveBlob('http://blob-blob.com', null, { id: 1 }, 1000);

    fetch.postMultipartFile('http://multi-part-post.com', null, { id: 1 }, null);

    fetch.putMultipartFile('http://multi-part-put.com', null, { id: 1 }, null);
    `;

    const output = `
    import fetch from '@/modules/fetch';
    import some from 'some-other-fetch-library';

    some.get('http://yourmom.com');

    some.put('http://madafaka.com', {name: 'user name'});

    fetch.get('http://site.com');

    fetch.put('http://site1.com', {
        data: {foo: 'bar'}
    });

    fetch.put('http://site2.com', {
        data: {foo: 'bar'},
        timeout: 200,
    });

    fetch.put('http://site3.com', {
        timeout: 200,
    });

    fetch.put('http://site4.com', {
        params: {id: '123'},
        data: {foo: 'bar'},
        timeout: 200,
    });

    fetch.put('http://site5.com', {
        params: {id: '123'},
        data: {foo: 'bar'},
    });

    fetch.put('http://site6.com', {
        params: {id: '123'},
        data: {foo: 'bar'},
    });

    fetch.put('http://site7.com', {
        params: {id: '123'},
    });

    fetch.put('http://site8.com', {
        params: {id: '123'},
    });

    fetch.get('http://url-with-blob.com', {
        timeout: 1000,
        responseType: 'blob',
    });

    fetch.post('http://blob-blob.com', {
        data: { id: 1 },
        timeout: 1000,
        responseType: 'blob',
    });

    fetch.post('http://multi-part-post.com', {
        data: { id: 1 },

        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    fetch.put('http://multi-part-put.com', {
        data: { id: 1 },

        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    `;

    const expected = applyTransform(updateFunctionCall, transformOptions, { source });
    expect(format(output)).toEqual(format(expected));
  });
});
