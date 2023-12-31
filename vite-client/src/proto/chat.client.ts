// @generated by protobuf-ts 2.9.1
// @generated from protobuf file "chat.proto" (syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { ChatService } from "./chat";
import type { UserList } from "./chat";
import type { ServerStreamingCall } from "@protobuf-ts/runtime-rpc";
import type { Empty } from "./chat";
import type { ChatMessage } from "./chat";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { JoinResponse } from "./chat";
import type { User } from "./chat";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service ChatService
 */
export interface IChatServiceClient {
    /**
     * @generated from protobuf rpc: join(User) returns (JoinResponse);
     */
    join(input: User, options?: RpcOptions): UnaryCall<User, JoinResponse>;
    /**
     * @generated from protobuf rpc: sendMsg(ChatMessage) returns (Empty);
     */
    sendMsg(input: ChatMessage, options?: RpcOptions): UnaryCall<ChatMessage, Empty>;
    /**
     * @generated from protobuf rpc: receiveMsg(Empty) returns (stream ChatMessage);
     */
    receiveMsg(input: Empty, options?: RpcOptions): ServerStreamingCall<Empty, ChatMessage>;
    /**
     * @generated from protobuf rpc: getAllUsers(Empty) returns (UserList);
     */
    getAllUsers(input: Empty, options?: RpcOptions): UnaryCall<Empty, UserList>;
}
/**
 * @generated from protobuf service ChatService
 */
export class ChatServiceClient implements IChatServiceClient, ServiceInfo {
    typeName = ChatService.typeName;
    methods = ChatService.methods;
    options = ChatService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: join(User) returns (JoinResponse);
     */
    join(input: User, options?: RpcOptions): UnaryCall<User, JoinResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<User, JoinResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: sendMsg(ChatMessage) returns (Empty);
     */
    sendMsg(input: ChatMessage, options?: RpcOptions): UnaryCall<ChatMessage, Empty> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<ChatMessage, Empty>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: receiveMsg(Empty) returns (stream ChatMessage);
     */
    receiveMsg(input: Empty, options?: RpcOptions): ServerStreamingCall<Empty, ChatMessage> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, ChatMessage>("serverStreaming", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: getAllUsers(Empty) returns (UserList);
     */
    getAllUsers(input: Empty, options?: RpcOptions): UnaryCall<Empty, UserList> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, UserList>("unary", this._transport, method, opt, input);
    }
}
