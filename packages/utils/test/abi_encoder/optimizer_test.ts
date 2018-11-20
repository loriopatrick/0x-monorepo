import * as chai from 'chai';
import 'mocha';

import { AbiEncoder, BigNumber } from '../../src/';
import { chaiSetup } from '../utils/chai_setup';

import * as OptimizedAbis from './abi_samples/optimizer_abis';

chaiSetup.configure();
const expect = chai.expect;

describe('ABI Encoder: Optimized Method Encoding/Decoding', () => {
    it('Duplicate Dynamic Arrays with Static Elements', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateDynamicArraysWithStaticElements);
        const array1 = [new BigNumber(100), new BigNumber(150)];
        const array2 = array1;
        const args = [array1, array2];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x7221063300000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000000096';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Dynamic Arrays with Dynamic Elements', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateDynamicArraysWithDynamicElements);
        const array1 = ['Hello', 'World'];
        const array2 = array1;
        const args = [array1, array2];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0xbb4f12e300000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005576f726c64000000000000000000000000000000000000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Static Arrays with Static Elements (should not optimize)', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateStaticArraysWithStaticElements);
        const array1 = [new BigNumber(100), new BigNumber(150)];
        const array2 = array1;
        const args = [array1, array2];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x7f8130430000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000009600000000000000000000000000000000000000000000000000000000000000640000000000000000000000000000000000000000000000000000000000000096';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        const unoptimizedCalldata = method.encode(args);
        expect(optimizedCalldata).to.be.equal(unoptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Static Arrays with Dynamic Elements', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateStaticArraysWithDynamicElements);
        const array1 = ['Hello', 'World'];
        const array2 = array1;
        const args = [array1, array2];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x9fe31f8e0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005576f726c64000000000000000000000000000000000000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Array Elements (should optimize)', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateArrayElements);
        const strings = ['Hello', 'World', 'Hello', 'World'];
        const args = [strings];
        // Validate calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x13e751a900000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005576f726c64000000000000000000000000000000000000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Tuple Fields', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateTupleFields);
        const tuple = ['Hello', 'Hello'];
        const args = [tuple];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x16780a5e000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000548656c6c6f000000000000000000000000000000000000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Strings', async () => {
        // Description:
        //   Two dynamic arrays with the same values.
        //   In the optimized calldata, only one set of elements should be included.
        //   Both arrays should point to this set.
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateStrings);
        const args = ['Hello', 'Hello'];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x07370bfa00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000548656c6c6f000000000000000000000000000000000000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Bytes', async () => {
        // Description:
        //   Two dynamic arrays with the same values.
        //   In the optimized calldata, only one set of elements should be included.
        //   Both arrays should point to this set.
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateBytes);
        const value = '0x01020304050607080910111213141516171819202122232425262728293031323334353637383940';
        const args = [value, value];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x6045e42900000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002801020304050607080910111213141516171819202122232425262728293031323334353637383940000000000000000000000000000000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Tuples', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateTuples);
        const tuple1 = ['Hello, World!', new BigNumber(424234)];
        const tuple2 = tuple1;
        const args = [tuple1, tuple2];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x564f826d000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000006792a000000000000000000000000000000000000000000000000000000000000000d48656c6c6f2c20576f726c642100000000000000000000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Fields Across Two Tuples', async () => {
        // Description:
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateTuples);
        const tuple1 = ['Hello, World!', new BigNumber(1)];
        const tuple2 = [tuple1[0], new BigNumber(2)];
        const args = [tuple1, tuple2];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x564f826d000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000d48656c6c6f2c20576f726c642100000000000000000000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Arrays, Nested in Separate Tuples', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateArraysNestedInTuples);
        const array = [new BigNumber(100), new BigNumber(150), new BigNumber(200)];
        const tuple1 = [array];
        const tuple2 = [array, 'extra argument to prevent exactly matching the tuples'];
        const args = [tuple1, tuple2];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x18970a9e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000009600000000000000000000000000000000000000000000000000000000000000c80000000000000000000000000000000000000000000000000000000000000035657874726120617267756d656e7420746f2070726576656e742065786163746c79206d61746368696e6720746865207475706c65730000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Tuples, Nested in Separate Tuples', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateTuplesNestedInTuples);
        const nestedTuple = ['Hello, World!'];
        const tuple1 = [nestedTuple];
        const tuple2 = [nestedTuple, 'extra argument to prevent exactly matching the tuples'];
        const args = [tuple1, tuple2];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x0b4d2e6a000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000d48656c6c6f2c20576f726c6421000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035657874726120617267756d656e7420746f2070726576656e742065786163746c79206d61746368696e6720746865207475706c65730000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Two-Dimensional Arrays', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateTwoDimensionalArrays);
        const twoDimArray1 = [['Hello', 'World'], ['Foo', 'Bar', 'Zaa']];
        const twoDimArray2 = twoDimArray1;
        const args = [twoDimArray1, twoDimArray2];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: false });
        const expectedOptimizedCalldata =
            '0x0d28c4f9000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002c0000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005576f726c640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003466f6f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003426172000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035a61610000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005576f726c640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000003466f6f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003426172000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000035a61610000000000000000000000000000000000000000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Duplicate Array, Nested within Separate Two-Dimensional Arrays', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.duplicateTwoDimensionalArrays);
        const twoDimArray1 = [['Hello', 'World'], ['Foo']];
        const twoDimArray2 = [['Hello', 'World'], ['Bar']];
        const args = [twoDimArray1, twoDimArray2];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x0d28c4f900000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003466f6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000548656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005576f726c640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000034261720000000000000000000000000000000000000000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Array Elements Duplicated as Tuple Fields', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.arrayElementsDuplicatedAsTupleFields);
        const array = [new BigNumber(100), new BigNumber(150), new BigNumber(200), new BigNumber(225)];
        const tuple = [[array[0]], [array[1]], [array[2]], [array[3]]];
        const args = [array, tuple];
        // Validata calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0x5b5c78fd0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000009600000000000000000000000000000000000000000000000000000000000000c800000000000000000000000000000000000000000000000000000000000000e1';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
    it('Array Elements Duplicated as Separate Parameter', async () => {
        // Generate calldata
        const method = new AbiEncoder.Method(OptimizedAbis.arrayElementsDuplicatedAsSeparateParameter);
        const array = ['Hello', 'Hello', 'Hello', 'World'];
        const str = 'Hello';
        const args = [array, str];
        // Validate calldata
        const optimizedCalldata = method.encode(args, { optimize: true });
        const expectedOptimizedCalldata =
            '0xe0e0d34900000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000005576f726c64000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000548656c6c6f000000000000000000000000000000000000000000000000000000';
        expect(optimizedCalldata).to.be.equal(expectedOptimizedCalldata);
        // Validate decoding
        const decodedArgs = method.decode(optimizedCalldata);
        const decodedArgsJson = JSON.stringify(decodedArgs);
        const argsJson = JSON.stringify(args);
        expect(decodedArgsJson).to.be.equal(argsJson);
    });
});
