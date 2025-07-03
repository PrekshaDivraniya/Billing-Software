package com.preksha.billingsoftware.service;

import com.preksha.billingsoftware.io.UserRequest;
import com.preksha.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
