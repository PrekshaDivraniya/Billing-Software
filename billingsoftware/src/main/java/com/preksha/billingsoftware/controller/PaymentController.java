package com.preksha.billingsoftware.controller;

import com.preksha.billingsoftware.io.OrderResponse;
import com.preksha.billingsoftware.io.PaymentRequest;
import com.preksha.billingsoftware.io.PaymentVerificationRequest;
import com.preksha.billingsoftware.io.RazorpayOrderResponse;
import com.preksha.billingsoftware.service.OrderService;
import com.preksha.billingsoftware.service.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException {
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request){
        return orderService.verifyPayment(request);
    }
}
