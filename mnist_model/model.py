import tensorflow as tf
import json

def mnist():
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(28, 28, 1), name="input_layer"),
        tf.keras.layers.Flatten(name="flatten_layer"),
        
        tf.keras.layers.Dense(256, activation='relu', name="dense_layer_1"),
        tf.keras.layers.BatchNormalization(name="batch_norm_1"),
        tf.keras.layers.Dropout(0.3, name="dropout_1"),
        
        tf.keras.layers.Dense(128, activation='relu', name="dense_layer_2"),
        tf.keras.layers.BatchNormalization(name="batch_norm_2"),
        tf.keras.layers.Dropout(0.3, name="dropout_2"),
        
        tf.keras.layers.Dense(10, activation='softmax', name="output_layer")
    ])

    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

model = mnist()
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()

x_train = x_train / 255.0
x_test = x_test / 255.0
x_train = x_train.reshape(-1, 28, 28, 1)
x_test = x_test.reshape(-1, 28, 28, 1)

model.fit(x_train, y_train, epochs=5, validation_data=(x_test, y_test))

model.save('mnist_model.h5')
